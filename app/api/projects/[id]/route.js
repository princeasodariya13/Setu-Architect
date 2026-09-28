import connectMongo from '@/lib/mongodb';
import Project from '@/models/Project';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectMongo();
    const { id } = await params;
    const body = await request.json();

    const updatedProject = await Project.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!updatedProject) {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedProject }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectMongo();
    
    // Await params as per Next.js 15+ routing requirements
    const { id } = await params; 

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

