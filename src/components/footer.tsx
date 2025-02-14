import Social from "./social";

export default function FooterSection() {
  return (
    <footer
      id="footer"
      className="w-[1250px] h-[300px] bg-[#222222] rounded-t-[15px] flex flex-col items-center gap-8 pt-10"
    >
      <p className="text-white text-2xl font-bold">Pavan Hutagi</p>

      <Social />
    </footer>
  );
}
