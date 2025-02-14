export default function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="flex gap-8">
        <div className="w-[500px] h-[600px] bg-dark-background dark:bg-background rounded-[15px]"></div>

        <div className="flex flex-col gap-4">
          <div className="w-[500px] h-[50px] bg-dark-background dark:bg-background rounded-[15px]"></div>
          <div className="w-[500px] h-[50px] bg-dark-background dark:bg-background rounded-[15px]"></div>
          <div className="w-[500px] h-[400px] bg-dark-background dark:bg-background rounded-[15px]"></div>
          <div className="w-[500px] h-[50px] bg-dark-background dark:bg-background rounded-[15px]"></div>
        </div>
      </div>
    </section>
  );
}
