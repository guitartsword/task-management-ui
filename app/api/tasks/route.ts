import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { getServerSession } from 'next-auth'

export async function GET(req: NextRequest) {
    const session = await getServerSession()
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET ?? '',
    })

    return NextResponse.json({
      token, session
    })
}