"use client";

export default function Root() {
  return (
    <main>
      <section
        id="home"
        className="min-h-screen flex items-center justify-center"
      >
        <h1 className="text-4xl font-bold text-[#d6d6d6]">Home</h1>
      </section>

      <section
        id="about"
        className="min-h-screen flex items-center justify-center"
      >
        <h1 className="text-4xl font-bold text-[#d6d6d6]">About</h1>
      </section>

      <section
        id="contact"
        className="min-h-screen flex items-center justify-center"
      >
        <h1 className="text-4xl font-bold text-[#d6d6d6]">Contact</h1>
      </section>
    </main>
  );
}
