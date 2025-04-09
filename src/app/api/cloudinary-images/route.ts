// src/app/api/cloudinary-images/route.js
import { NextResponse, NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request : NextRequest) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder');

  if (!folder) {
    return NextResponse.json({ error: 'Folder parameter is required' }, { status: 400 });
  }

  try {
    const response = await cloudinary.search
      .expression(`folder:${folder}`)
      .sort_by('public_id', 'asc')
      .max_results(400)
      .execute();

    const publicIds = response.resources.map((resource : any) => resource.public_id);
    return NextResponse.json(publicIds);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch images from Cloudinary' },
      { status: 500 }
    );
  }
}