"use client";

export default function HomeSection() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--xPos", `${x}%`);
    e.currentTarget.style.setProperty("--yPos", `${y}%`);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
    >
      <h1 className="text-text dark:text-dark-text text-6xl font-bold mb-10">
        Hi, I'm Pavan Hutagi
      </h1>

      <div
        className="bg-[#484950] text-white px-5 py-3 rounded-full cursor-pointer relative group"
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at var(--xPos, 100%) var(--yPos, 100%), #dd1613, transparent 75%)",
          }}
        />

        <p className="text-dark-text text-2xl relative z-10">
          I build modern web solutions & love turning ideas into reality
        </p>
      </div>
    </section>
  );
}
