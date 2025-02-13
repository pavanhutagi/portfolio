"use client";

export default function Root() {
  return (
    <main>
      <section
        id="home"
        className="min-h-screen flex items-center justify-center"
      >
        <Home />
      </section>

      <section
        id="about"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="bg-[#D4D4D4] rounded-[50px] w-[1200] h-[700px] flex items-center justify-center"></div>
      </section>

      <section
        id="contact"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="flex gap-8">
          <div className="w-[500px] h-[600px] bg-[#7e7e7e] rounded-[15px]"></div>

          <div className="flex flex-col gap-4">
            <div className="w-[500px] h-[50px] bg-[#D4D4D4] rounded-[15px]"></div>
            <div className="w-[500px] h-[50px] bg-[#D4D4D4] rounded-[15px]"></div>
            <div className="w-[500px] h-[400px] bg-[#D4D4D4] rounded-[15px]"></div>

            <div className="w-[500px] h-[50px] bg-[#606377] rounded-[15px]"></div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function Home() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--xPos", `${x}%`);
    e.currentTarget.style.setProperty("--yPos", `${y}%`);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl text-white font-bold mb-10">
        Hi, I'm Pavan Hutagi
      </h1>

      <div
        className="bg-[#2f1c73] text-white px-5 py-3 rounded-full cursor-pointer relative group"
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at var(--xPos, 50%) var(--yPos, 50%), rgba(255, 0, 166, 0.25), transparent 50%)",
          }}
        />

        <p className="text-2xl relative z-10">
          I build modern web solutions & love turning ideas into reality
        </p>
      </div>
    </section>
  );
}
