import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    totalProjects: 0,
    totalBlogPosts: 0,
    totalMessages: 0,
    unreadMessages: 0,
    publishedPosts: 0,
    featuredProjects: 0,
  });
}
