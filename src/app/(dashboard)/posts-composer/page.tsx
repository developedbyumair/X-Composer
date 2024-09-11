import { PostLayout } from '@/ui/components/PostLayout'
import { PostBodyLayout } from '@/ui/components/PostBodyLayout'

export const metadata = {
  title: 'Posts'
}

export default function Page() {
  return (
    <>
      <PostLayout />
      <PostBodyLayout />
    </>
  )
}
