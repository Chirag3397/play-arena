import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, rigType, date, startTime, duration } = body;

        // TODO: Real validation and logic
        // For now, create a dummy booking

        // Find an available rig of the type
        const rig = await prisma.rig.findFirst({
            where: { type: rigType }
        });

        if (!rig) {
            // Create a dummy rig if none exists for demo
            const newRig = await prisma.rig.create({
                data: {
                    name: `${rigType}-01`,
                    type: rigType,
                    hourlyRate: rigType === 'CONSOLE' ? 149 : 199,
                }
            });
            return NextResponse.json({ success: true, bookingId: 'demo-id', rig: newRig });
        }

        // In a real app, we would check for overlaps here using booking table

        // Create User if not exists (demo)
        let user = await prisma.user.findFirst({ where: { email: 'demo@example.com' } });
        if (!user) {
            user = await prisma.user.create({
                data: { email: 'demo@example.com', name: 'Demo User' }
            });
        }

        const booking = await prisma.booking.create({
            data: {
                userId: user.id,
                rigId: rig.id,
                startTime: new Date(`${date}T${startTime}`),
                endTime: new Date(new Date(`${date}T${startTime}`).getTime() + duration * 60 * 60 * 1000),
                totalAmount: rig.hourlyRate * duration,
                status: 'CONFIRMED'
            }
        });

        return NextResponse.json({ success: true, booking });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Booking failed' }, { status: 500 });
    }
}
