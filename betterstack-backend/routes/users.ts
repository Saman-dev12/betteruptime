import {Router} from "express"
import {Webhook} from "svix"
import type { WebhookEvent } from '@clerk/backend'
import prisma from "../utils/prisma"
import type { Request, Response } from "express"


const router = Router();

router.post('/webhook', async (req: Request, res: Response): Promise<void> => {
        console.log("Enter")
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
      console.error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env')
      res.status(500).json({ error: 'Server configuration error' })
      return
    }

    try {
      const svix_id = req.headers['svix-id'] as string
      const svix_timestamp = req.headers['svix-timestamp'] as string
      const svix_signature = req.headers['svix-signature'] as string

      if (!svix_id || !svix_timestamp || !svix_signature) {
        res.status(400).json({ error: 'Missing svix headers' })
        return
      }

      const webhook = new Webhook(WEBHOOK_SECRET)
      const evt = webhook.verify(JSON.stringify(req.body), {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent

      const eventType = evt.type

      if (eventType === 'user.created' || eventType === 'user.updated') {
        const { id, email_addresses, first_name, last_name, image_url, username } = evt.data

        const primaryEmail = email_addresses?.[0]?.email_address

        if (!primaryEmail) {
          res.status(400).json({ error: 'No primary email found' })
          return
        }

        await prisma.user.upsert({
          where: { clerkId: id },
          update: {
            email: primaryEmail,
            firstName: first_name,
            lastName: last_name,
            imageUrl: image_url,
            username: username
          },
          create: {
            clerkId: id,
            email: primaryEmail,
            firstName: first_name,
            lastName: last_name,
            imageUrl: image_url,
            username: username
          }
        })
      }

      if (eventType === 'user.deleted') {
        const { id } = evt.data
        await prisma.user.delete({
          where: { clerkId: id }
        })
      }

      res.status(200).json({ success: true })
    } catch (err) {
      console.error('Error processing webhook:', err)
      res.status(400).json({ error: 'Webhook error' })
    }
  })

export default router;


