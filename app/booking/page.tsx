import BookingWizard from '@/components/Booking/BookingWizard';

export default function BookingPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-black italic mb-4">SECURE YOUR <span className="text-primary text-glow">SPOT</span></h1>
                    <p className="text-zinc-400 text-xl">Don't wait in queue. Book your rig instantly.</p>
                </div>

                <BookingWizard />
            </div>
        </div>
    );
}
