import Navbar from "./Navbar";

export default function LandingPage() {
  return (
    <>
      <div className="absolute -z-10 h-[100px] w-[100px] rounded-full bg-secondary blur-[200px]"></div>
      <div className="absolute left-0 top-1/2 -z-10 h-[100px] w-[100px] -translate-y-1/2 rounded-full bg-secondary blur-[200px]"></div>

      <div className="mb-10 flex flex-col items-center gap-5 px-5 pt-8 text-primary-white">
        <h1 className="text-2xl font-bold underline">في فضل القرآن</h1>
        <p className="text-center text-xl">
          <i>
            أن النبي صلى الله عليه وسلم قال: {"("}من قرأ حرفاً من كتاب الله فله
            به حسنة، والحسنة بعشر أمثالها، لا أقول: &quot;الم&quot; حرف، ولكن
            &quot;ألف&quot; حرف، و &quot;لام&quot; حرف، و &quot;ميم&quot; حرف
            {")"}.
          </i>
        </p>
      </div>

      <div className="container mx-auto pt-[44px] sm:px-32">
        <Navbar landingPage />
      </div>
    </>
  );
}
