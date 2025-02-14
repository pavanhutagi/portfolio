export default function ContactSection() {
  return (
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
  );
}
