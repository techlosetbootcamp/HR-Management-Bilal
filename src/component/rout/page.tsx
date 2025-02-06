import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div>
      <Link href={'../app/auth/login/route.tsx'}>
      Login
      </Link>
    </div>
  )
}
