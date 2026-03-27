import svgPaths from "./svg-x7d7o1apfi";
import imgHeroSection from "figma:asset/94e6a9a31550727f3edf9ac21b2fe42cf66732c3.png";
import imgBackgroundPattern from "figma:asset/62fa7f0a71b80dbd73b217e26f1516cafd24b2f6.png";
import imgBackgroundDecoration from "figma:asset/10ee6fa07af3484c979ae760af19b85bccfb567f.png";
import imgService from "figma:asset/1bd31e564b919964dec7c96360d704ff906d9cfd.png";
import imgImageBox2 from "figma:asset/25627c74ffdda41d8470f25341589f1e89c4e09c.png";
import imgCard2 from "figma:asset/d3115e06001e15b0685c46fcca65addc03c888dd.png";
import imgCard3 from "figma:asset/13900e4ae61f8cf8eb93e47eb929f3df250a0db3.png";
import imgCard4 from "figma:asset/1c8a83a48e1895c7b375714475945db3ffd0057f.png";
import imgUser from "figma:asset/ba175a753d699b38ea3fa99777203a9cb1557a2a.png";
import imgUser1 from "figma:asset/4cec9f9cb27a9791e9bb04fc610e2c997bfddc0d.png";
import imgUser2 from "figma:asset/f6b19f841d579c1a4b2e42e48df37709d413e546.png";

function BackgroundPattern() {
  return (
    <div className="absolute inset-0 mix-blend-multiply opacity-50" data-name="Background pattern">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-694.1%] max-w-none top-0 w-[1488.19%]" src={imgBackgroundPattern} />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Background">
      <BackgroundPattern />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex inset-0 items-start" data-name="Container">
      <div className="bg-[#0055d5] flex-[1_0_0] h-full min-h-px min-w-px" data-name="Background" />
      <Background />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shadow-[0px_4px_3px_0px_rgba(0,0,0,0.1),0px_10px_8px_0px_rgba(0,0,0,0.04)] shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[144px] justify-center leading-[72px] not-italic relative shrink-0 text-[72px] text-white w-[484.25px]">
        <p className="mb-0">Get the career</p>
        <p>you deserve</p>
      </div>
    </div>
  );
}

function Heading1Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Heading 1:margin">
      <Heading />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip py-px relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#374151] text-[16px] w-full">
        <p className="leading-[17px]">Graduate</p>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Options">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pl-[28px] pr-[40px] py-[8px] relative w-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.0023">
        <g id="SVG">
          <path d={svgPaths.p3f4b2700} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#0055d5] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Button">
      <Container3 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-white max-w-[600px] relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="content-stretch flex items-center max-w-[inherit] p-[8px] relative w-full">
          <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]" data-name="Overlay+Shadow" />
          <Options />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[600px] pb-[24px] relative shrink-0 w-[600px]" data-name="Margin">
      <Background1 />
    </div>
  );
}

function Background2() {
  return (
    <div className="absolute bg-[#05183f] bottom-[36.5px] content-stretch flex flex-col items-start left-0 px-[16px] py-[6px] rounded-[9999px] top-0" data-name="Background">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white w-[48.3px]">
        <p className="leading-[16.5px]">Marketing</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="absolute bg-[#05183f] bottom-[36.5px] content-stretch flex flex-col items-start left-[88.3px] px-[16px] py-[6px] rounded-[9999px] top-0" data-name="Background">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white w-[90.5px]">
        <p className="leading-[16.5px]">Computer Science</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="absolute bg-[#05183f] bottom-[36.5px] content-stretch flex flex-col items-start left-[218.8px] px-[16px] py-[6px] rounded-[9999px] top-0" data-name="Background">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white w-[89.28px]">
        <p className="leading-[16.5px]">Graduate Scheme</p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="absolute bg-[#05183f] bottom-[36.5px] content-stretch flex flex-col items-start left-[348.08px] px-[16px] py-[6px] rounded-[9999px] top-0" data-name="Background">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white w-[64.83px]">
        <p className="leading-[16.5px]">Sustainability</p>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="absolute bg-[#05183f] bottom-[36.5px] content-stretch flex flex-col items-start left-[452.91px] px-[16px] py-[6px] rounded-[9999px] top-0" data-name="Background">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white w-[75px]">
        <p className="leading-[16.5px]">Hybrid Working</p>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="absolute bg-[#05183f] bottom-0 content-stretch flex flex-col items-start left-0 px-[16px] py-[6px] rounded-[9999px] top-[36.5px]" data-name="Background">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-white w-[42.17px]">
        <p className="leading-[16.5px]">Diversity</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[65px] max-w-[600px] relative shrink-0 w-[600px]" data-name="Container">
      <Background2 />
      <Background3 />
      <Background4 />
      <Background5 />
      <Background6 />
      <Background7 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[0.89%_0.63%_0.47%_0.73%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 126.26 126.26">
        <g id="Group">
          <path d={svgPaths.p31484ee0} fill="var(--fill-0, #E6FF00)" id="Vector" />
          <path d={svgPaths.p1e228a00} fill="var(--fill-0, #E6FF00)" id="Vector_2" />
          <path d={svgPaths.p1a2e2d00} fill="var(--fill-0, #E6FF00)" id="Vector_3" />
          <path d={svgPaths.p3e195700} fill="var(--fill-0, #E6FF00)" id="Vector_4" />
          <path d={svgPaths.pdfa1980} fill="var(--fill-0, #E6FF00)" id="Vector_5" />
          <path d={svgPaths.pd1c7320} fill="var(--fill-0, #E6FF00)" id="Vector_6" />
          <path d={svgPaths.p1f0f68c0} fill="var(--fill-0, #E6FF00)" id="Vector_7" />
        </g>
      </svg>
    </div>
  );
}

function Svg1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[128px]" data-name="SVG">
      <Group />
    </div>
  );
}

function J4GVPjJv26PXgpsJjxTStDwtnrH22FcloneSiteAssets2Fe899001EDfd74Ee5B0D6296A84C506EdSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[128px]" data-name="j4gVPjJv26PXgpsJjxTStDwtnrH2%2Fclone-site-assets%2Fe899001e-dfd7-4ee5-b0d6-296a84c506ed.svg fill">
      <Svg1 />
    </div>
  );
}

function Seal() {
  return (
    <div className="aspect-[128/128] content-stretch flex flex-col items-start max-w-[768px] opacity-80 overflow-clip relative shrink-0" data-name="Seal">
      <J4GVPjJv26PXgpsJjxTStDwtnrH22FcloneSiteAssets2Fe899001EDfd74Ee5B0D6296A84C506EdSvgFill />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Seal />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[48px] relative shrink-0 w-full" data-name="Margin">
      <Container5 />
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[80px] pt-[160px] px-[48px] relative w-full">
          <Heading1Margin />
          <Margin />
          <Container4 />
          <Margin1 />
        </div>
      </div>
    </div>
  );
}

function LeftSideSplitVisual() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[745px] items-start overflow-clip relative shrink-0 w-[864px]" data-name="Left Side: Split Visual">
      <Container />
      <Container1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#3a3a3a] text-[24px] text-right w-[341.42px]">
        <p className="leading-[32px]">Graduate Recruitment Bureau</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[88px] justify-center leading-[29.25px] not-italic relative shrink-0 text-[#4b5563] text-[18px] text-right w-[399.23px]">
        <p className="mb-0">{`We are the UK's leading independent graduate`}</p>
        <p className="mb-0">recruitment consultancy, matching students and</p>
        <p>graduates with high-quality employers since 1996.</p>
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 16">
        <g id="SVG">
          <path d={svgPaths.p5fb8390} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg2 />
    </div>
  );
}

function Link() {
  return (
    <div className="bg-[#0055d5] relative rounded-[9999px] self-stretch shrink-0" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] h-full items-center pb-[17.5px] pt-[16.5px] px-[32px] relative">
          <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-right text-white w-[70.27px]">
            <p className="leading-[24px]">Find a job</p>
          </div>
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative rounded-[9999px] self-stretch shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col h-full items-end px-[33px] py-[17px] relative">
          <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#3a3a3a] text-[16px] text-right w-[104.95px]">
            <p className="leading-[24px]">Hire graduates</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[16px] h-[66.7px] items-start justify-end pt-[8.7px] relative shrink-0 w-full" data-name="Container">
      <Link />
      <Link1 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[23.3px] items-start max-w-[448px] relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bottom-[48.75%] content-stretch flex flex-col items-start pl-px right-[39px] top-[48.75%]" data-name="Container">
      <div className="flex h-[161.04px] items-center justify-center relative shrink-0 w-[36px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[36px] justify-center leading-[0] not-italic opacity-10 relative text-[30px] text-black tracking-[3px] uppercase w-[161.04px]">
            <p className="leading-[36px]">Experts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RightSideContent() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex flex-col h-[745px] items-start justify-end pl-[80px] pr-[48px] py-[48px] relative shrink-0 w-[576px]" data-name="Right Side: Content">
      <Container6 />
      <Container10 />
    </div>
  );
}

function HeroSection1() {
  return (
    <div className="absolute h-[745px] left-0 opacity-20 top-0 w-[1440px]" data-name="Hero Section">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHeroSection} />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="absolute content-stretch flex items-start left-0 right-0 top-[81px]" data-name="Hero Section">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHeroSection} />
      <LeftSideSplitVisual />
      <RightSideContent />
      <HeroSection1 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3a3a3a] text-[60px] w-full">
        <p className="mb-0">
          <span className="leading-[60px]">{`Join our `}</span>
          <span className="font-['Liberation_Sans:Bold',sans-serif] leading-[60px] not-italic text-[#9ca3af]">growing</span>
        </p>
        <p className="mb-0">
          <span className="font-['Liberation_Sans:Bold',sans-serif] leading-[60px] not-italic text-[#9ca3af]">community</span>
          <span className="leading-[60px]">{` and`}</span>
        </p>
        <p className="leading-[60px] mb-0">experience our</p>
        <p className="font-['Liberation_Sans:Regular_Italic',sans-serif] leading-[60px] mb-0 text-[#9ca3af]">industry-leading</p>
        <p className="font-['Liberation_Sans:Regular_Italic',sans-serif] leading-[60px] mb-0 text-[#9ca3af]">career matchmaking</p>
        <p className="mb-0">
          <span className="font-['Liberation_Sans:Regular_Italic',sans-serif] leading-[60px] not-italic text-[#9ca3af]">service</span>
          <span className="leading-[60px]">{` for `}</span>
          <span className="font-['Liberation_Sans:Bold',sans-serif] leading-[60px] not-italic text-[#9ca3af]">graduates</span>
        </p>
        <p className="leading-[60px]">and students</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px pb-[32px] relative" data-name="Container">
      <Heading2 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[32.5px] not-italic relative shrink-0 text-[#4b5563] text-[20px] w-full">
        <p className="mb-0">{`GRB is the UK's leading independent graduate recruitment`}</p>
        <p className="mb-0">consultancy. Our team of experts provide a professional, friendly and</p>
        <p>free service to help you find your dream graduate job.</p>
      </div>
    </div>
  );
}

function BackgroundDecoration() {
  return (
    <div className="absolute bottom-[-79.5px] h-[274.28px] max-w-[1440px] opacity-10 right-[-80px] w-[320px]" data-name="Background decoration">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgBackgroundDecoration} />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Container14 />
      <BackgroundDecoration />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[64px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function IntroTextSection() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-0 overflow-clip pb-[96px] pt-[128px] px-[80px] right-0 top-[912px]" data-name="Intro Text Section">
      <Container11 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white w-full">
        <p className="leading-[32px]">CV Advice</p>
      </div>
    </div>
  );
}

function Heading4Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Heading 4:margin">
      <Heading3 />
    </div>
  );
}

function Svg3() {
  return (
    <div className="h-[14px] relative shrink-0 w-[10.5px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 14">
        <g id="SVG">
          <path d={svgPaths.p1e8dec0} fill="var(--fill-0, white)" fillOpacity="0.7" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg3 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.7)] w-[168.06px]">
        <p className="leading-[20px]">Expert tips for your resume</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function SmallInfoBox() {
  return (
    <div className="bg-[#05183f] col-[1/span_4] justify-self-stretch min-h-[300px] relative rounded-[24px] row-2 self-start shrink-0" data-name="Small Info Box">
      <div className="flex flex-col justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-end min-h-[inherit] pb-[32px] pt-[200px] px-[32px] relative w-full">
          <Heading4Margin />
          <Container16 />
        </div>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[48px] not-italic relative shrink-0 text-[48px] text-white w-full">
        <p className="mb-0">Finding you the</p>
        <p>right role</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[512px] relative shrink-0 w-[512px]" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[56px] justify-center leading-[28px] not-italic relative shrink-0 text-[18px] text-[rgba(255,255,255,0.8)] w-[494.23px]">
        <p className="mb-0">Our dedicated consultants work across all sectors to find roles</p>
        <p>that match your skills and aspirations.</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Container20 />
    </div>
  );
}

function MainBlueBox() {
  return (
    <div className="bg-[#0055d5] col-[1/span_8] justify-self-stretch min-h-[400px] relative rounded-[24px] row-1 self-start shrink-0" data-name="Main Blue Box">
      <div className="flex flex-col justify-end min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-end min-h-[inherit] pb-[48px] pt-[184px] px-[48px] relative w-full">
          <Container19 />
        </div>
      </div>
    </div>
  );
}

function Service() {
  return (
    <div className="absolute inset-[0_0.01px_0_0]" data-name="Service">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-25%] max-w-none top-0 w-[150%]" src={imgService} />
      </div>
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[64px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="SVG">
          <path d={svgPaths.pb69fd80} fill="var(--fill-0, #EBEBEB)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function J4GVPjJv26PXgpsJjxTStDwtnrH22FcloneSiteAssets2F5Ca0A1De9F2646C6B5FcCf2Edf820BaeSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[64px]" data-name="j4gVPjJv26PXgpsJjxTStDwtnrH2%2Fclone-site-assets%2F5ca0a1de-9f26-46c6-b5fc-cf2edf820bae.svg fill">
      <Svg4 />
    </div>
  );
}

function Icon() {
  return (
    <div className="aspect-[64/64] content-stretch flex flex-col items-start max-w-[426.6600036621094px] overflow-clip relative shrink-0" data-name="Icon">
      <J4GVPjJv26PXgpsJjxTStDwtnrH22FcloneSiteAssets2F5Ca0A1De9F2646C6B5FcCf2Edf820BaeSvgFill />
    </div>
  );
}

function ImgIconMargin() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[426.6600036621094px] pb-[24px] relative shrink-0 w-[64px]" data-name="Img - Icon:margin">
      <Icon />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white w-full">
        <p className="leading-[32px]">Engaging Content</p>
      </div>
    </div>
  );
}

function Heading4Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Heading 4:margin">
      <Heading5 />
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p3377cd80} fill="var(--fill-0, white)" fillOpacity="0.7" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg5 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.7)] w-[66.16px]">
        <p className="leading-[20px]">5 min read</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Container24 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_0.01px_0_0] items-start justify-end p-[40px]" data-name="Container">
      <ImgIconMargin />
      <Heading4Margin1 />
      <Container22 />
    </div>
  );
}

function ImageBox() {
  return (
    <div className="col-[9/span_4] h-[400px] justify-self-stretch min-h-[400px] overflow-clip relative rounded-[24px] row-1 shrink-0" data-name="Image Box 1">
      <Service />
      <div className="absolute bg-gradient-to-b from-[rgba(5,24,63,0)] inset-[0_0.01px_0_0] to-[#05183f]" data-name="Gradient" />
      <Container21 />
    </div>
  );
}

function Heading4Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0" data-name="Heading 4:margin">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white w-[216.78px]">
        <p className="leading-[36px]">Interview Skills</p>
      </div>
    </div>
  );
}

function Svg6() {
  return (
    <div className="h-[14px] relative shrink-0 w-[15.75px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.75 14">
        <g id="SVG">
          <path d={svgPaths.p2363d800} fill="var(--fill-0, white)" fillOpacity="0.7" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg6 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.7)] w-[138.53px]">
        <p className="leading-[20px]">Master your technique</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start justify-end p-[40px]" data-name="Container">
      <Heading4Margin2 />
      <Container26 />
    </div>
  );
}

function ImageBox1() {
  return (
    <div className="col-[5/span_8] h-[300px] justify-self-stretch min-h-[300px] overflow-clip relative rounded-[24px] row-2 shrink-0" data-name="Image Box 2">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[184.44%] left-0 max-w-none top-[-42.22%] w-full" src={imgImageBox2} />
      </div>
      <div className="absolute bg-gradient-to-b from-[rgba(5,24,63,0)] inset-0 to-[#05183f]" data-name="Gradient" />
      <Container25 />
    </div>
  );
}

function Container15() {
  return (
    <div className="gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[__400px_300px] max-w-[1600px] relative shrink-0 w-full" data-name="Container">
      <SmallInfoBox />
      <MainBlueBox />
      <ImageBox />
      <ImageBox1 />
    </div>
  );
}

function SectionServiceGrid() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-0 px-[48px] py-[80px] right-0 top-[1588px]" data-name="Section - Service Grid">
      <Container15 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[60px] justify-center leading-[0] not-italic relative shrink-0 text-[#3a3a3a] text-[60px] text-center w-[853.55px]">
        <p className="leading-[60px]">Graduate Recruitment Bureau</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[768px] relative shrink-0 w-[768px]" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[56px] justify-center leading-[28px] not-italic relative shrink-0 text-[#6b7280] text-[20px] text-center w-[743.34px]">
        <p className="mb-0">We specialize in various sectors to ensure we find the perfect match for your degree</p>
        <p>and career goals.</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-center left-[20px] max-w-[1400px] px-[24px] right-[20px] top-[128px]" data-name="Container">
      <Heading6 />
      <Container30 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white w-full">
        <p className="leading-[36px]">Physics</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Container">
      <Heading7 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-[#0055d5] content-stretch flex flex-col h-[500px] items-start justify-end left-[160px] min-w-[320px] overflow-clip p-[40px] rounded-[24px] top-0 w-[320px]" data-name="Card 1">
      <Container32 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[36px] not-italic relative shrink-0 text-[30px] text-white w-full">
        <p className="mb-0">Mechanical</p>
        <p>Engineering</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Container">
      <Heading8 />
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute bg-[#e5e7eb] content-stretch flex flex-col h-[500px] items-start justify-end left-[512px] min-w-[320px] overflow-clip p-[40px] rounded-[24px] top-0" data-name="Card 2">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-75%] max-w-none top-0 w-[250%]" src={imgCard2} />
      </div>
      <div className="absolute bg-gradient-to-b from-[24%] from-[rgba(0,38,77,0)] inset-0 opacity-60 to-[#00264d]" data-name="Gradient" />
      <Container33 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white w-full">
        <p className="leading-[36px]">Marketing</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Container">
      <Heading9 />
    </div>
  );
}

function Card2() {
  return (
    <div className="absolute bg-[#e5e7eb] content-stretch flex flex-col h-[500px] items-start justify-end left-[864px] min-w-[320px] overflow-clip p-[40px] rounded-[24px] top-0" data-name="Card 3">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-75%] max-w-none top-0 w-[250%]" src={imgCard3} />
      </div>
      <div className="absolute bg-gradient-to-b from-[24%] from-[rgba(0,38,77,0)] inset-0 opacity-60 to-[#00264d]" data-name="Gradient" />
      <Container34 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white w-full">
        <p className="leading-[36px]">IT</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Container">
      <Heading10 />
    </div>
  );
}

function Card3() {
  return (
    <div className="absolute bg-[#e5e7eb] content-stretch flex flex-col h-[500px] items-start justify-end left-[1216px] min-w-[320px] overflow-clip p-[40px] rounded-[24px] top-0" data-name="Card 4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-75%] max-w-none top-0 w-[250%]" src={imgCard4} />
      </div>
      <div className="absolute bg-gradient-to-b from-[24%] from-[rgba(0,38,77,0)] inset-0 opacity-60 to-[#00264d]" data-name="Gradient" />
      <Container35 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute h-[540px] left-0 overflow-clip right-0 top-[332px]" data-name="Container">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
    </div>
  );
}

function Svg7() {
  return (
    <div className="h-[16px] relative shrink-0 w-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 16">
        <g id="SVG">
          <path d={svgPaths.p1485da00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg7 />
    </div>
  );
}

function Link2() {
  return (
    <div className="bg-[#0055d5] relative rounded-[9999px] self-stretch shrink-0" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] h-full items-center pb-[16.5px] pt-[15.5px] px-[40px] relative">
          <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[112.08px]">
            <p className="leading-[24px]">See all sectors</p>
          </div>
          <Container37 />
        </div>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex h-[56px] items-start justify-center left-0 right-0 top-[920px]" data-name="Container">
      <Link2 />
    </div>
  );
}

function SectorCarouselSection() {
  return (
    <div className="absolute bg-white h-[1104px] left-0 overflow-clip right-0 top-[2480px]" data-name="Sector Carousel Section">
      <Container29 />
      <Container31 />
      <Container36 />
    </div>
  );
}

function Heading11() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[60px] justify-center leading-[0] not-italic relative shrink-0 text-[#3a3a3a] text-[60px] text-center w-[713.42px]">
        <p className="leading-[60px]">Loved by our community</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[672px] relative shrink-0 w-[672px]" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[56px] justify-center leading-[28px] not-italic relative shrink-0 text-[#6b7280] text-[20px] text-center w-[655.9px]">
        <p className="mb-0">Hear from the people who have experienced our career matching services</p>
        <p>and professional guidance first hand.</p>
      </div>
    </div>
  );
}

function Svg8() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16.0018">
        <g id="SVG">
          <path d={svgPaths.p4f47580} fill="var(--fill-0, #E6FF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Svg8 />
    </div>
  );
}

function Svg9() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16.0018">
        <g id="SVG">
          <path d={svgPaths.p4f47580} fill="var(--fill-0, #E6FF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Svg9 />
    </div>
  );
}

function Svg10() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16.0018">
        <g id="SVG">
          <path d={svgPaths.p4f47580} fill="var(--fill-0, #E6FF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Svg10 />
    </div>
  );
}

function Svg11() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16.0018">
        <g id="SVG">
          <path d={svgPaths.p4f47580} fill="var(--fill-0, #E6FF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Svg11 />
    </div>
  );
}

function Svg12() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16.0018">
        <g id="SVG">
          <path d={svgPaths.p4f47580} fill="var(--fill-0, #E6FF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Svg12 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[4px] h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Container43 />
      <Container44 />
      <Container45 />
      <Container46 />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular_Italic',sans-serif] justify-center leading-[28px] not-italic relative shrink-0 text-[#4b5563] text-[18px] w-full">
        <p className="mb-0">{`"GRB helped me find my first role after`}</p>
        <p className="mb-0">university. The support was incredible</p>
        <p>{`throughout the entire process."`}</p>
      </div>
    </div>
  );
}

function User() {
  return (
    <div className="max-w-[362.6600036621094px] relative rounded-[9999px] shrink-0 size-[48px]" data-name="User">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUser} />
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#3a3a3a] text-[16px] w-[108.5px]">
        <p className="leading-[24px]">Sarah Jenkins</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] w-[106.06px]">
        <p className="leading-[16px]">Marketing Graduate</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[108.5px]" data-name="Container">
      <Container50 />
      <Container51 />
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex gap-[16px] items-center pt-[8px] relative shrink-0 w-full" data-name="Container">
      <User />
      <Container49 />
    </div>
  );
}

function Testimonial() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[40px] row-1 self-start shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="Testimonial 1">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[40px] relative w-full">
        <Container41 />
        <Container47 />
        <Container48 />
      </div>
    </div>
  );
}

function Svg13() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16.0018">
        <g id="SVG">
          <path d={svgPaths.p4f47580} fill="var(--fill-0, #E6FF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Svg13 />
    </div>
  );
}

function Svg14() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16.0018">
        <g id="SVG">
          <path d={svgPaths.p4f47580} fill="var(--fill-0, #E6FF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Svg14 />
    </div>
  );
}

function Svg15() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16.0018">
        <g id="SVG">
          <path d={svgPaths.p4f47580} fill="var(--fill-0, #E6FF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Svg15 />
    </div>
  );
}

function Svg16() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16.0018">
        <g id="SVG">
          <path d={svgPaths.p4f47580} fill="var(--fill-0, #E6FF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Svg16 />
    </div>
  );
}

function Svg17() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16.0018">
        <g id="SVG">
          <path d={svgPaths.p4f47580} fill="var(--fill-0, #E6FF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Svg17 />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex gap-[4px] h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Container53 />
      <Container54 />
      <Container55 />
      <Container56 />
      <Container57 />
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular_Italic',sans-serif] justify-center leading-[28px] not-italic relative shrink-0 text-[18px] text-white w-full">
        <p className="mb-0">{`"Professional, efficient and genuinely cared`}</p>
        <p className="mb-0">about my career path. Highly recommend to</p>
        <p>{`any student."`}</p>
      </div>
    </div>
  );
}

function User1() {
  return (
    <div className="max-w-[362.6700134277344px] relative rounded-[9999px] shrink-0 size-[48px]" data-name="User">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUser1} />
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[106.56px]">
        <p className="leading-[24px]">James Wilson</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#93c5fd] text-[12px] w-[98.73px]">
        <p className="leading-[16px]">Software Engineer</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[106.56px]" data-name="Container">
      <Container61 />
      <Container62 />
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex gap-[16px] items-center pt-[8px] relative shrink-0 w-full" data-name="Container">
      <User1 />
      <Container60 />
    </div>
  );
}

function Testimonial1() {
  return (
    <div className="bg-[#05183f] col-2 justify-self-stretch relative rounded-[40px] row-1 self-start shrink-0" data-name="Testimonial 2">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[40px] relative w-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[40px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" data-name="Testimonial 2:shadow" />
        <Container52 />
        <Container58 />
        <Container59 />
      </div>
    </div>
  );
}

function Svg18() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16.0018">
        <g id="SVG">
          <path d={svgPaths.p4f47580} fill="var(--fill-0, #E6FF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Svg18 />
    </div>
  );
}

function Svg19() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16.0018">
        <g id="SVG">
          <path d={svgPaths.p4f47580} fill="var(--fill-0, #E6FF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Svg19 />
    </div>
  );
}

function Svg20() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16.0018">
        <g id="SVG">
          <path d={svgPaths.p4f47580} fill="var(--fill-0, #E6FF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Svg20 />
    </div>
  );
}

function Svg21() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16.0018">
        <g id="SVG">
          <path d={svgPaths.p4f47580} fill="var(--fill-0, #E6FF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Svg21 />
    </div>
  );
}

function Svg22() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16.0018">
        <g id="SVG">
          <path d={svgPaths.p4f47580} fill="var(--fill-0, #E6FF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Svg22 />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex gap-[4px] h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Container64 />
      <Container65 />
      <Container66 />
      <Container67 />
      <Container68 />
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular_Italic',sans-serif] justify-center leading-[28px] not-italic relative shrink-0 text-[#4b5563] text-[18px] w-full">
        <p className="mb-0">{`"I was struggling to get interviews until I`}</p>
        <p className="mb-0">joined GRB. They polished my CV and got</p>
        <p>{`me 3 interviews in a week!"`}</p>
      </div>
    </div>
  );
}

function User2() {
  return (
    <div className="max-w-[362.6600036621094px] relative rounded-[9999px] shrink-0 size-[48px]" data-name="User">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUser2} />
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#3a3a3a] text-[16px] w-[87.14px]">
        <p className="leading-[24px]">Emily Chen</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] w-[67.38px]">
        <p className="leading-[16px]">Data Analyst</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[87.14px]" data-name="Container">
      <Container72 />
      <Container73 />
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex gap-[16px] items-center pt-[8px] relative shrink-0 w-full" data-name="Container">
      <User2 />
      <Container71 />
    </div>
  );
}

function Testimonial2() {
  return (
    <div className="bg-white col-3 justify-self-stretch relative rounded-[40px] row-1 self-start shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="Testimonial 3">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[40px] relative w-full">
        <Container63 />
        <Container69 />
        <Container70 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_284px] pt-[56px] relative shrink-0 w-full" data-name="Container">
      <Testimonial />
      <Testimonial1 />
      <Testimonial2 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[1400px] relative shrink-0 w-full" data-name="Container">
      <Heading11 />
      <Container39 />
      <Container40 />
    </div>
  );
}

function TestimonialsSection() {
  return (
    <div className="absolute bg-[#f4f4f4] content-stretch flex flex-col items-start left-0 px-[24px] py-[128px] right-0 top-[3584px]" data-name="Testimonials Section">
      <Container38 />
    </div>
  );
}

function Svg23() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="SVG">
          <path d={svgPaths.p2a024d00} fill="var(--fill-0, #0055D5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg23 />
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0055d5] text-[10px] tracking-[1px] uppercase w-[106.88px]">
        <p className="leading-[15px]">{` Careers Advice`}</p>
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[32px] not-italic relative shrink-0 text-[#3a3a3a] text-[24px] w-full">
        <p className="mb-0">How to Secure a Graduate</p>
        <p>Leadership Scheme</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[24px] not-italic relative shrink-0 text-[#6b7280] text-[16px] w-full">
        <p className="mb-0">If you want early responsibility and a clear path to</p>
        <p className="mb-0">career growth, graduate leadership schemes are</p>
        <p>worth exploring. Read our guide to learn more...</p>
      </div>
    </div>
  );
}

function Svg24() {
  return (
    <div className="h-[16px] relative shrink-0 w-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 16">
        <g id="SVG">
          <path d={svgPaths.p1485da00} fill="var(--fill-0, #0055D5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg24 />
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pt-[15.5px] relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0055d5] text-[16px] w-[82.7px]">
        <p className="leading-[24px]">Read more</p>
      </div>
      <Container78 />
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#f8f8f8] relative rounded-[24px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[32px] relative w-full">
        <Container76 />
        <Heading12 />
        <Container77 />
        <Link3 />
      </div>
    </div>
  );
}

function Article() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch pb-[24px] relative row-1 self-start shrink-0" data-name="Article 1">
      <Background8 />
    </div>
  );
}

function Svg25() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="SVG">
          <path d={svgPaths.p2a024d00} fill="var(--fill-0, #E6FF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg25 />
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6ff00] text-[10px] tracking-[1px] uppercase w-[106.88px]">
        <p className="leading-[15px]">{` Careers Advice`}</p>
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[32px] not-italic relative shrink-0 text-[24px] text-white w-full">
        <p className="mb-0">How To Bounce Back After Job</p>
        <p>Rejection as a Graduate</p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[24px] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] w-full">
        <p className="mb-0">Few feelings hit harder than opening a rejection</p>
        <p className="mb-0">email after putting real effort into an application.</p>
        <p>But the truth is simple: Rejection is...</p>
      </div>
    </div>
  );
}

function Svg26() {
  return (
    <div className="h-[16px] relative shrink-0 w-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 16">
        <g id="SVG">
          <path d={svgPaths.p1485da00} fill="var(--fill-0, #E6FF00)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg26 />
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pt-[15.5px] relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#e6ff00] text-[16px] w-[82.7px]">
        <p className="leading-[24px]">Read more</p>
      </div>
      <Container81 />
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#0055d5] relative rounded-[24px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[32px] relative w-full">
        <Container79 />
        <Heading13 />
        <Container80 />
        <Link4 />
      </div>
    </div>
  );
}

function Article2Featured() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch pb-[24px] relative row-1 self-start shrink-0" data-name="Article 2 (Featured)">
      <Background9 />
    </div>
  );
}

function Svg27() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="SVG">
          <path d={svgPaths.p2a024d00} fill="var(--fill-0, #0055D5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg27 />
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0055d5] text-[10px] tracking-[1px] uppercase w-[106.88px]">
        <p className="leading-[15px]">{` Careers Advice`}</p>
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[32px] not-italic relative shrink-0 text-[#3a3a3a] text-[24px] w-full">
        <p className="mb-0">5 Graduate CV Mistakes and</p>
        <p>How to Fix Them</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[24px] not-italic relative shrink-0 text-[#6b7280] text-[16px] w-full">
        <p className="mb-0">As a recent graduate, your CV plays a huge role in</p>
        <p className="mb-0">opening the door to your first professional role.</p>
        <p>Small mistakes, such as...</p>
      </div>
    </div>
  );
}

function Svg28() {
  return (
    <div className="h-[16px] relative shrink-0 w-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 16">
        <g id="SVG">
          <path d={svgPaths.p1485da00} fill="var(--fill-0, #0055D5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg28 />
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pt-[15.5px] relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0055d5] text-[16px] w-[82.7px]">
        <p className="leading-[24px]">Read more</p>
      </div>
      <Container84 />
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#f8f8f8] relative rounded-[24px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[32px] relative w-full">
        <Container82 />
        <Heading14 />
        <Container83 />
        <Link5 />
      </div>
    </div>
  );
}

function Article1() {
  return (
    <div className="col-3 content-stretch flex flex-col items-start justify-self-stretch pb-[24px] relative row-1 self-start shrink-0" data-name="Article 3">
      <Background10 />
    </div>
  );
}

function Container75() {
  return (
    <div className="gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_327px] relative shrink-0 w-full" data-name="Container">
      <Article />
      <Article2Featured />
      <Article1 />
    </div>
  );
}

function Svg29() {
  return (
    <div className="h-[10px] relative shrink-0 w-[12.5px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5002 10">
        <g id="SVG">
          <path d={svgPaths.p3b02db80} fill="var(--fill-0, #0055D5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg29 />
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0055d5] text-[10px] tracking-[1px] uppercase w-[75.83px]">
        <p className="leading-[15px]">{` Interviews`}</p>
      </div>
    </div>
  );
}

function Heading15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[32px] not-italic relative shrink-0 text-[#3a3a3a] text-[24px] w-full">
        <p className="mb-0">7 Things to Research for Your Graduate Job</p>
        <p>Interview</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[24px] not-italic relative shrink-0 text-[#6b7280] text-[16px] w-full">
        <p className="mb-0">Interviews can feel like the most daunting part of any graduate job application. I’ve</p>
        <p>sat through my fair share of them, and I know...</p>
      </div>
    </div>
  );
}

function Svg30() {
  return (
    <div className="h-[16px] relative shrink-0 w-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 16">
        <g id="SVG">
          <path d={svgPaths.p1485da00} fill="var(--fill-0, #0055D5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg30 />
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pt-[7.5px] relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0055d5] text-[16px] w-[82.7px]">
        <p className="leading-[24px]">Read more</p>
      </div>
      <Container87 />
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#f8f8f8] col-1 justify-self-stretch relative rounded-[24px] row-1 self-start shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[32px] relative w-full">
        <Container85 />
        <Heading15 />
        <Container86 />
        <Link6 />
      </div>
    </div>
  );
}

function Svg31() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="SVG">
          <path d={svgPaths.p2a024d00} fill="var(--fill-0, #0055D5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg31 />
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0055d5] text-[10px] tracking-[1px] uppercase w-[106.88px]">
        <p className="leading-[15px]">{` Careers Advice`}</p>
      </div>
    </div>
  );
}

function Heading16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3a3a3a] text-[24px] w-full">
        <p className="leading-[32px]">What Does It Mean? A Career in Analytics</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[24px] not-italic relative shrink-0 text-[#6b7280] text-[16px] w-full">
        <p className="mb-0">Whether you’re passionate about problem solving, uncovering trends, or making</p>
        <p className="mb-0">sense of complex numbers, this guide will help you land your dream graduate job</p>
        <p>in...</p>
      </div>
    </div>
  );
}

function Svg32() {
  return (
    <div className="h-[16px] relative shrink-0 w-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 16">
        <g id="SVG">
          <path d={svgPaths.p1485da00} fill="var(--fill-0, #0055D5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg32 />
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pt-[7.5px] relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0055d5] text-[16px] w-[82.7px]">
        <p className="leading-[24px]">Read more</p>
      </div>
      <Container90 />
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#f8f8f8] col-2 justify-self-stretch relative rounded-[24px] row-1 self-start shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[40px] pt-[32px] px-[32px] relative w-full">
        <Container88 />
        <Heading16 />
        <Container89 />
        <Link7 />
      </div>
    </div>
  );
}

function BottomRowArticles() {
  return (
    <div className="gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_271px] relative shrink-0 w-full" data-name="Bottom Row Articles">
      <Background11 />
      <Background12 />
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[1600px] relative shrink-0 w-full" data-name="Container">
      <Container75 />
      <BottomRowArticles />
    </div>
  );
}

function SectionBlogArticlesGrid() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-0 px-[48px] py-[128px] right-0 top-[4344px]" data-name="Section - Blog/Articles Grid">
      <Container74 />
    </div>
  );
}

function Heading17() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[180px] justify-center leading-[60px] not-italic relative shrink-0 text-[60px] text-center text-white w-[760.23px]">
        <p className="mb-0">Register your free account</p>
        <p className="mb-0">now to see your matching</p>
        <p>jobs.</p>
      </div>
    </div>
  );
}

function Svg33() {
  return (
    <div className="h-[18px] relative shrink-0 w-[22.5px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 18">
        <g id="SVG">
          <path d={svgPaths.p2cf4c00} fill="var(--fill-0, #0055D5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg33 />
    </div>
  );
}

function Link8() {
  return (
    <div className="bg-white relative rounded-[9999px] self-stretch shrink-0" data-name="Link">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[12px] h-full items-center justify-center px-[48px] py-[20px] relative">
          <Container93 />
          <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0055d5] text-[18px] text-center w-[72.03px]">
            <p className="leading-[28px]">Register</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Svg34() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p1eeee9a0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container94() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Svg34 />
      </div>
    </div>
  );
}

function Link9() {
  return (
    <div className="relative rounded-[9999px] self-stretch shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[12px] h-full items-center justify-center px-[50px] py-[22px] relative">
          <Container94 />
          <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-white w-[48.98px]">
            <p className="leading-[28px]">Login</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex gap-[24.01px] h-[72px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Link8 />
      <Link9 />
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start max-w-[896px] relative shrink-0 w-full" data-name="Container">
      <Heading17 />
      <Container92 />
    </div>
  );
}

function CtaSection() {
  return (
    <div className="absolute bg-[#0055d5] content-stretch flex flex-col items-start left-0 px-[272px] py-[96px] right-0 top-[5230px]" data-name="CTA Section">
      <Container91 />
    </div>
  );
}

function Layer() {
  return (
    <div className="h-[60px] relative shrink-0 w-[128px]" data-name="Layer_4">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128 60">
        <g clipPath="url(#clip0_10_521)" id="Layer_4">
          <path d={svgPaths.p10874b00} fill="var(--fill-0, #0055D5)" id="Vector" />
          <path d={svgPaths.p379a3460} fill="var(--fill-0, #0055D5)" id="Vector_2" />
          <path d={svgPaths.p34d4ba80} fill="var(--fill-0, #0055D5)" id="Vector_3" />
          <path d={svgPaths.pbc97280} fill="var(--fill-0, #0055D5)" id="Vector_4" />
        </g>
        <defs>
          <clipPath id="clip0_10_521">
            <rect fill="white" height="60" width="128" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function J4GVPjJv26PXgpsJjxTStDwtnrH22FcloneSiteAssets2F1E935E14A94C44109Da3E321Fd58Fc8FSvgFill() {
  return (
    <div className="content-stretch flex flex-col h-[60px] items-center justify-center overflow-clip relative shrink-0 w-[128px]" data-name="j4gVPjJv26PXgpsJjxTStDwtnrH2%2Fclone-site-assets%2F1e935e14-a94c-4410-9da3-e321fd58fc8f.svg fill">
      <Layer />
    </div>
  );
}

function GrbLogo() {
  return (
    <div className="aspect-[128/60] content-stretch flex flex-col items-start max-w-[405.3299865722656px] overflow-clip relative shrink-0" data-name="GRB Logo">
      <J4GVPjJv26PXgpsJjxTStDwtnrH22FcloneSiteAssets2F1E935E14A94C44109Da3E321Fd58Fc8FSvgFill />
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[22.75px] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="mb-0">GRB (Graduate Recruitment Bureau) are part of The GRB Group</p>
        <p className="mb-0">- an award-winning, multi-service early talent solutions</p>
        <p>recruitment partner.</p>
      </div>
    </div>
  );
}

function Svg35() {
  return (
    <div className="h-[16px] relative shrink-0 w-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0078 16">
        <g id="SVG">
          <path d={svgPaths.pd41bc0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg35 />
    </div>
  );
}

function Link10() {
  return (
    <div className="bg-[#1f2937] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Link">
      <Container99 />
    </div>
  );
}

function Svg36() {
  return (
    <div className="h-[16px] relative shrink-0 w-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 16">
        <g id="SVG">
          <path d={svgPaths.pbaf2580} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg36 />
    </div>
  );
}

function Link11() {
  return (
    <div className="bg-[#1f2937] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Link">
      <Container100 />
    </div>
  );
}

function Svg37() {
  return (
    <div className="h-[16px] relative shrink-0 w-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 16">
        <g id="SVG">
          <path d={svgPaths.p3e84d200} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg37 />
    </div>
  );
}

function Link12() {
  return (
    <div className="bg-[#1f2937] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Link">
      <Container101 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[1.66%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.4688 15.4688">
        <g id="Group">
          <path d={svgPaths.p2fd98990} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p397326c0} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p1f53b540} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p1167cc00} fill="var(--fill-0, white)" id="Vector_4" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function Svg38() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <Group1 />
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg38 />
    </div>
  );
}

function Link13() {
  return (
    <div className="bg-[#1f2937] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Link">
      <Container102 />
    </div>
  );
}

function Svg39() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16">
        <g id="SVG">
          <path d={svgPaths.p332c20c0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg39 />
    </div>
  );
}

function Link14() {
  return (
    <div className="bg-[#1f2937] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Link">
      <Container103 />
    </div>
  );
}

function Svg40() {
  return (
    <div className="h-[16px] relative shrink-0 w-[10px]" data-name="SVG">
      <div className="absolute inset-[-2.17%_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 16.3479">
          <g id="SVG">
            <path d={svgPaths.p171d2480} fill="var(--fill-0, white)" id="Vector" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg40 />
    </div>
  );
}

function Link15() {
  return (
    <div className="bg-[#1f2937] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Link">
      <Container104 />
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex gap-[16px] items-start pt-[0.7px] relative shrink-0 w-full" data-name="Container">
      <Link10 />
      <Link11 />
      <Link12 />
      <Link13 />
      <Link14 />
      <Link15 />
    </div>
  );
}

function Svg41() {
  return (
    <div className="h-[14px] relative shrink-0 w-[10.5px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5041 14">
        <g id="SVG">
          <path d={svgPaths.p2f5d5660} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg41 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#0055d5] content-stretch flex gap-[8px] items-center pb-[12px] pt-[12.7px] px-[24px] relative rounded-[9999px] shrink-0" data-name="Button">
      <Container105 />
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[76.23px]">
        <p className="leading-[20px]">Back to top</p>
      </div>
    </div>
  );
}

function BrandInfo() {
  return (
    <div className="col-[1/span_4] content-stretch flex flex-col gap-[31.3px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Brand Info">
      <GrbLogo />
      <Container97 />
      <Container98 />
      <Button1 />
    </div>
  );
}

function Heading18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white w-full">
        <p className="leading-[28px]">Sitemap</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Item">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-[37.36px]">
        <p className="leading-[20px]">Home</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Item">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-[68.48px]">
        <p className="leading-[20px]">Job search</p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-start shrink-0" data-name="Item">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-[87.16px]">
        <p className="leading-[20px]">Career advice</p>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-start shrink-0" data-name="Item">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-[66.16px]">
        <p className="leading-[20px]">Article hub</p>
      </div>
    </div>
  );
}

function Item4() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-3 self-start shrink-0" data-name="Item">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-[124.52px]">
        <p className="leading-[20px]">Featured employers</p>
      </div>
    </div>
  );
}

function Item5() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-3 self-start shrink-0" data-name="Item">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-[114.38px]">
        <p className="leading-[20px]">Employer services</p>
      </div>
    </div>
  );
}

function Item6() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-4 self-start shrink-0" data-name="Item">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-[55.27px]">
        <p className="leading-[20px]">About us</p>
      </div>
    </div>
  );
}

function Item7() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-4 self-start shrink-0" data-name="Item">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-[66.94px]">
        <p className="leading-[20px]">Contact us</p>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[____20px_20px_20px_20px] relative shrink-0 w-full" data-name="List">
      <Item />
      <Item1 />
      <Item2 />
      <Item3 />
      <Item4 />
      <Item5 />
      <Item6 />
      <Item7 />
    </div>
  );
}

function Sitemap() {
  return (
    <div className="col-[5/span_4] content-stretch flex flex-col gap-[32px] items-start justify-self-stretch pb-[120.25px] relative row-1 self-start shrink-0" data-name="Sitemap">
      <Heading18 />
      <List />
    </div>
  );
}

function Heading19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white w-full">
        <p className="leading-[28px]">Legal</p>
      </div>
    </div>
  );
}

function Item8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">Privacy policy</p>
      </div>
    </div>
  );
}

function Item9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">Data protection</p>
      </div>
    </div>
  );
}

function Item10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">{`Terms & conditions`}</p>
      </div>
    </div>
  );
}

function Item11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">Cookie policy</p>
      </div>
    </div>
  );
}

function Item12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">{`All policies & terms`}</p>
      </div>
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List">
      <Item8 />
      <Item9 />
      <Item10 />
      <Item11 />
      <Item12 />
    </div>
  );
}

function Svg42() {
  return (
    <div className="h-[150px] relative shrink-0 w-[131.25px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 131.25 150">
        <g id="SVG">
          <path d={svgPaths.p860a380} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container106() {
  return (
    <div className="absolute bottom-[-40px] content-stretch flex flex-col items-start opacity-5 right-[-39.99px]" data-name="Container">
      <Svg42 />
    </div>
  );
}

function Legal() {
  return (
    <div className="col-[9/span_4] content-stretch flex flex-col gap-[32px] items-start justify-self-stretch pb-[84.25px] relative row-1 self-start shrink-0" data-name="Legal">
      <Heading19 />
      <List1 />
      <Container106 />
    </div>
  );
}

function Container96() {
  return (
    <div className="gap-x-[64px] gap-y-[64px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_308.25px] relative shrink-0 w-full" data-name="Container">
      <BrandInfo />
      <Sitemap />
      <Legal />
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex flex-col items-center pt-[33px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#1f2937] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] text-center w-[307.67px]">
        <p className="leading-[16px]">© 2026 Graduate Recruitment Bureau. All rights reserved.</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1400px] relative shrink-0 w-full" data-name="Container">
      <Container96 />
      <HorizontalBorder />
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bg-[#201c25] content-stretch flex flex-col items-start left-0 pb-[48px] pt-[96px] px-[48px] right-0 top-[5722px]" data-name="Footer">
      <Container95 />
    </div>
  );
}

function Container108() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#05183f] text-[14px] tracking-[1.4px] uppercase w-[558.75px]">
        <p className="leading-[20px]">Graduate Customer Service and Reservation Agent - £25,000</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#05183f] text-[14px] tracking-[1.4px] uppercase w-[6.31px]">
        <p className="leading-[20px]">•</p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#05183f] text-[14px] tracking-[1.4px] uppercase w-[386.88px]">
        <p className="leading-[20px]">Graduate Trainee Social Worker - £34,000</p>
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#05183f] text-[14px] tracking-[1.4px] uppercase w-[6.31px]">
        <p className="leading-[20px]">•</p>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#05183f] text-[14px] tracking-[1.4px] uppercase w-[351.98px]">
        <p className="leading-[20px]">Software Engineer Graduate - £45,000</p>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="h-[20px] relative shrink-0 w-[2163.3px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[48px] items-start relative size-full">
        <Container108 />
        <Container109 />
        <Container110 />
        <Container111 />
        <Container112 />
        <div className="self-stretch shrink-0 w-[6.31px]" data-name="Rectangle" />
        <div className="self-stretch shrink-0 w-[558.75px]" data-name="Rectangle" />
      </div>
    </div>
  );
}

function MarqueeBanner() {
  return (
    <div className="absolute bg-[#e6ff00] left-0 right-0 top-[842px]" data-name="Marquee Banner">
      <div className="content-stretch flex flex-col items-start overflow-clip py-[17px] relative rounded-[inherit] w-full">
        <Container107 />
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-b border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function Layer1() {
  return (
    <div className="h-[60px] relative shrink-0 w-[128px]" data-name="Layer_4">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128 60">
        <g clipPath="url(#clip0_10_503)" id="Layer_4">
          <path d={svgPaths.p3b3ef200} fill="var(--fill-0, #0055D5)" id="Vector" />
          <path d={svgPaths.p6827780} fill="var(--fill-0, #0055D5)" id="Vector_2" />
          <path d={svgPaths.p34d4ba80} fill="var(--fill-0, #0055D5)" id="Vector_3" />
          <path d={svgPaths.pbc97280} fill="var(--fill-0, #0055D5)" id="Vector_4" />
        </g>
        <defs>
          <clipPath id="clip0_10_503">
            <rect fill="white" height="60" width="128" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function J4GVPjJv26PXgpsJjxTStDwtnrH22FcloneSiteAssets2F1E935E14A94C44109Da3E321Fd58Fc8FSvgFill1() {
  return (
    <div className="content-stretch flex flex-col h-[60px] items-center justify-center overflow-clip relative shrink-0 w-[128px]" data-name="j4gVPjJv26PXgpsJjxTStDwtnrH2%2Fclone-site-assets%2F1e935e14-a94c-4410-9da3-e321fd58fc8f.svg fill">
      <Layer1 />
    </div>
  );
}

function GrbLogo1() {
  return (
    <div className="aspect-[128/60] content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="GRB Logo">
      <J4GVPjJv26PXgpsJjxTStDwtnrH22FcloneSiteAssets2F1E935E14A94C44109Da3E321Fd58Fc8FSvgFill1 />
    </div>
  );
}

function Link16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <GrbLogo1 />
    </div>
  );
}

function Link17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#3a3a3a] text-[14px] w-[68.48px]">
        <p className="leading-[20px]">Job search</p>
      </div>
    </div>
  );
}

function Link18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#3a3a3a] text-[14px] w-[75.48px]">
        <p className="leading-[20px]">Job seekers</p>
      </div>
    </div>
  );
}

function Link19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#3a3a3a] text-[14px] w-[63.8px]">
        <p className="leading-[20px]">Recruiters</p>
      </div>
    </div>
  );
}

function Link20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#3a3a3a] text-[14px] w-[55.27px]">
        <p className="leading-[20px]">About us</p>
      </div>
    </div>
  );
}

function Svg43() {
  return (
    <div className="h-[14px] relative shrink-0 w-[12.25px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.25 14">
        <g id="SVG">
          <path d={svgPaths.p2ffe300} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Link21() {
  return (
    <div className="bg-[#0055d5] content-stretch flex gap-[8px] items-center px-[24px] py-[10px] relative rounded-[9999px] shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[59.16px]">
        <p className="leading-[20px]">{`Join now `}</p>
      </div>
      <Svg43 />
    </div>
  );
}

function Svg44() {
  return (
    <div className="h-[20px] relative shrink-0 w-[17.5px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 20">
        <g id="SVG">
          <path d={svgPaths.p2ff2ec80} fill="var(--fill-0, #6B7280)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Link22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <Svg44 />
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Nav">
      <Link17 />
      <Link18 />
      <Link19 />
      <Link20 />
      <Link21 />
      <Link22 />
    </div>
  );
}

function Container113() {
  return (
    <div className="h-[80px] max-w-[1400px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between max-w-[inherit] px-[32px] relative size-full">
          <Link16 />
          <Nav />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] content-stretch flex flex-col items-start left-0 pb-px px-[20px] top-0 w-[1440px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container113 />
    </div>
  );
}

export default function Body() {
  return (
    <div className="bg-[#f4f4f4] relative size-full" data-name="Body">
      <HeroSection />
      <IntroTextSection />
      <SectionServiceGrid />
      <SectorCarouselSection />
      <TestimonialsSection />
      <SectionBlogArticlesGrid />
      <CtaSection />
      <Footer />
      <MarqueeBanner />
      <Header />
    </div>
  );
}