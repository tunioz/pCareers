import svgPaths from "./svg-anhsrd4we6";
import imgHeroSection from "figma:asset/e5ae15a34b3ed6bfb93f98b7ffbdccbdfa45a73c.png";
import imgProfessionalUniversityGraduatesAtACampusSetting from "figma:asset/faa5fd23107f3ca30d3cb898258a17bdbc0c0579.png";
import imgModernOfficeMeetingRoomWithDiverseTeam from "figma:asset/27567b061e51e6ece0dbb0c62decee860d8deabf.png";
import imgBusinessMeetingInOffice from "figma:asset/5e0e7f87df2fd2960305f7cf3bf1d1e3847b0ba6.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] justify-center leading-[72px] not-italic relative shrink-0 text-[72px] text-white w-full">
        <p className="mb-0">Recruitment</p>
        <p>Consultancy</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[448px] opacity-90 relative shrink-0 w-[448px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[56px] justify-center leading-[28px] not-italic relative shrink-0 text-[18px] text-white w-[424.88px]">
        <p className="mb-0">{`Use our traditional search & selection recruitment`}</p>
        <p>service to source talent on a no-hire no-fee basis.</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.0033">
        <g id="SVG">
          <path d={svgPaths.p12c2fd00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg />
    </div>
  );
}

function Link() {
  return (
    <div className="bg-[#0055d5] relative rounded-[9999px] self-stretch shrink-0" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-full items-center px-[32px] py-[16px] relative">
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[93.28px]">
            <p className="leading-[24px]">Get in touch</p>
          </div>
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[12px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0047 16">
        <g id="SVG">
          <path d={svgPaths.p301f2580} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Svg1 />
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative rounded-[9999px] self-stretch shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-full items-center px-[33px] py-[17px] relative">
          <Container5 />
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[86.69px]">
            <p className="leading-[24px]">Back to top</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[16px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <Link />
      <Link1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[24.5px] items-start justify-self-stretch relative row-1 self-end shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[12px] text-white tracking-[1.2px] uppercase w-[146.98px]">
        <p className="leading-[16px]">EMPLOYER SERVICES</p>
      </div>
      <Heading />
      <Container2 />
      <Container3 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#e6ff00] text-[20px] w-full">
        <p className="leading-[28px]">grb.</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container7 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="opacity-80 relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.75px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[22.75px] not-italic relative shrink-0 text-[14px] text-white w-full">
          <p className="mb-0">Before we introduce candidates into the process</p>
          <p className="mb-0">we spend time getting to know your company and</p>
          <p className="mb-0">the role. We will pitch your opportunity and</p>
          <p className="mb-0">present you each candidate profile summarizing</p>
          <p>what makes them stand out.</p>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center opacity-60 relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white w-[42.95px]">
        <p className="[text-decoration-skip-ink:none] decoration-solid leading-[16px] underline">Decline</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center opacity-60 relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white w-[69.56px]">
        <p className="[text-decoration-skip-ink:none] decoration-solid leading-[16px] underline">Preferences</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#e6ff00] content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#05183f] text-[12px] text-center w-[59.39px]">
        <p className="leading-[16px]">Accept All</p>
      </div>
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-[91.38999938964844px] relative" data-name="Button:margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[98.094px] relative w-full">
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center pt-[13px] relative w-full">
        <Button />
        <Button1 />
        <ButtonMargin />
      </div>
    </div>
  );
}

function BackgroundBorderOverlayBlur() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(5,24,63,0.95)] max-w-[384px] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+OverlayBlur">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[11px] items-start max-w-[inherit] p-[25px] relative w-full">
        <Container6 />
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

function CookiePrivacyFloatingCardAsPerDesign() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-end shrink-0" data-name="Cookie/Privacy Floating Card (As per design)">
      <div className="content-stretch flex flex-col items-start pl-[232px] relative w-full">
        <BackgroundBorderOverlayBlur />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_346px] max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <CookiePrivacyFloatingCardAsPerDesign />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="relative shrink-0 w-full" data-name="Hero Section">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgHeroSection} />
        <div className="absolute bg-gradient-to-r from-[#0055d5] from-[40%] inset-0 to-[40%] to-[rgba(0,85,213,0)]" />
      </div>
      <div className="flex flex-col justify-end size-full">
        <div className="content-stretch flex flex-col items-start justify-end p-[80px] relative w-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col font-['Poppins:Semi_Bold',sans-serif] items-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[48px] text-center w-full" data-name="Heading 2">
      <div className="flex flex-col h-[96px] justify-center relative shrink-0 w-[844.96px]">
        <p className="mb-0">
          <span className="leading-[48px]">{`Our `}</span>
          <span className="font-['Poppins:Semi_Bold',sans-serif] leading-[48px] not-italic text-[#05183f]">{`search & selection`}</span>
          <span className="leading-[48px]">{` service is`}</span>
        </p>
        <p>
          <span className="leading-[48px]">{`designed for `}</span>
          <span className="font-['Poppins:Semi_Bold',sans-serif] leading-[48px] not-italic text-[#05183f]">early talent recruiters</span>
        </p>
      </div>
      <div className="flex flex-col h-[96px] justify-center relative shrink-0 w-[964.72px]">
        <p className="mb-0">
          <span className="leading-[48px]">{`looking to recruit `}</span>
          <span className="font-['Poppins:Semi_Bold',sans-serif] leading-[48px] not-italic text-[#05183f]">exceptional university</span>
        </p>
        <p className="leading-[48px] text-[#05183f]">students and graduates</p>
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[120px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 120">
        <g clipPath="url(#clip0_10_2743)" id="SVG">
          <path d="M120 120H0V0H120V120V120" fill="var(--fill-0, #F4F4F4)" id="Vector" />
          <path d={svgPaths.pd382200} fill="var(--fill-0, #9CA3AF)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_10_2743">
            <rect fill="white" height="120" width="120" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start opacity-10 right-[-48px]" data-name="Container">
      <Svg2 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1024px] relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container11 />
    </div>
  );
}

function IntroTextSection() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Intro Text Section">
      <div className="content-stretch flex flex-col items-start px-[208px] py-[96px] relative w-full">
        <Container10 />
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="SVG">
          <path d={svgPaths.p16b16280} fill="var(--fill-0, #EBEBEB)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function J4GVPjJv26PXgpsJjxTStDwtnrH22FcloneSiteAssets2F18Fe7Bbc9Fd247B5A5A0829C988E8E2FSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[40px]" data-name="j4gVPjJv26PXgpsJjxTStDwtnrH2%2Fclone-site-assets%2F18fe7bbc-9fd2-47b5-a5a0-829c988e8e2f.svg fill">
      <Svg3 />
    </div>
  );
}

function Guardian() {
  return (
    <div className="aspect-[40/40] content-stretch flex flex-col items-start max-w-[1152px] overflow-clip relative shrink-0" data-name="Guardian">
      <J4GVPjJv26PXgpsJjxTStDwtnrH22FcloneSiteAssets2F18Fe7Bbc9Fd247B5A5A0829C988E8E2FSvgFill />
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="SVG">
          <path d={svgPaths.p16b16280} fill="var(--fill-0, #EBEBEB)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function J4GVPjJv26PXgpsJjxTStDwtnrH22FcloneSiteAssets2F18Fe7Bbc9Fd247B5A5A0829C988E8E2FSvgFill1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[40px]" data-name="j4gVPjJv26PXgpsJjxTStDwtnrH2%2Fclone-site-assets%2F18fe7bbc-9fd2-47b5-a5a0-829c988e8e2f.svg fill">
      <Svg4 />
    </div>
  );
}

function FinancialTimes() {
  return (
    <div className="aspect-[40/40] content-stretch flex flex-col items-start max-w-[1152px] overflow-clip relative shrink-0" data-name="Financial Times">
      <J4GVPjJv26PXgpsJjxTStDwtnrH22FcloneSiteAssets2F18Fe7Bbc9Fd247B5A5A0829C988E8E2FSvgFill1 />
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="SVG">
          <path d={svgPaths.p16b16280} fill="var(--fill-0, #EBEBEB)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function J4GVPjJv26PXgpsJjxTStDwtnrH22FcloneSiteAssets2F18Fe7Bbc9Fd247B5A5A0829C988E8E2FSvgFill2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[40px]" data-name="j4gVPjJv26PXgpsJjxTStDwtnrH2%2Fclone-site-assets%2F18fe7bbc-9fd2-47b5-a5a0-829c988e8e2f.svg fill">
      <Svg5 />
    </div>
  );
}

function NewScientist() {
  return (
    <div className="aspect-[40/40] content-stretch flex flex-col items-start max-w-[1152px] overflow-clip relative shrink-0" data-name="New Scientist">
      <J4GVPjJv26PXgpsJjxTStDwtnrH22FcloneSiteAssets2F18Fe7Bbc9Fd247B5A5A0829C988E8E2FSvgFill2 />
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="SVG">
          <path d={svgPaths.p16b16280} fill="var(--fill-0, #EBEBEB)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function J4GVPjJv26PXgpsJjxTStDwtnrH22FcloneSiteAssets2F18Fe7Bbc9Fd247B5A5A0829C988E8E2FSvgFill3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[40px]" data-name="j4gVPjJv26PXgpsJjxTStDwtnrH2%2Fclone-site-assets%2F18fe7bbc-9fd2-47b5-a5a0-829c988e8e2f.svg fill">
      <Svg6 />
    </div>
  );
}

function Economist() {
  return (
    <div className="aspect-[40/40] content-stretch flex flex-col items-start max-w-[1152px] overflow-clip relative shrink-0" data-name="Economist">
      <J4GVPjJv26PXgpsJjxTStDwtnrH22FcloneSiteAssets2F18Fe7Bbc9Fd247B5A5A0829C988E8E2FSvgFill3 />
    </div>
  );
}

function Background() {
  return (
    <div className="content-stretch flex gap-[96px] items-center justify-center max-w-[1152px] opacity-60 relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-saturation pointer-events-none" />
      <Guardian />
      <FinancialTimes />
      <NewScientist />
      <Economist />
    </div>
  );
}

function SectionPartnerLogos() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Section - Partner Logos">
      <div className="content-stretch flex flex-col items-start pb-[96px] px-[144px] relative w-full">
        <Background />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-white w-full">
        <p className="leading-[48px]">71%</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-full">
        <p className="leading-[20px]">CV to interview rate with our clients</p>
      </div>
    </div>
  );
}

function Stat() {
  return (
    <div className="bg-[#05183f] col-[1/span_3] justify-self-stretch min-h-[250px] relative rounded-[16px] row-1 self-start shrink-0" data-name="Stat 1">
      <div className="content-stretch flex flex-col items-start justify-between min-h-[inherit] p-[32px] relative w-full">
        <Container12 />
        <Container13 />
      </div>
    </div>
  );
}

function ProfessionalUniversityGraduatesAtACampusSetting() {
  return (
    <div className="max-w-[302px] relative shrink-0 size-[302px]" data-name="professional university graduates at a campus setting">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgProfessionalUniversityGraduatesAtACampusSetting} />
      </div>
    </div>
  );
}

function Stat2ImagePlaceholder() {
  return (
    <div className="bg-[rgba(86,86,86,0.2)] col-[4/span_3] content-stretch flex flex-col items-start justify-self-stretch min-h-[250px] overflow-clip relative rounded-[16px] row-1 self-start shrink-0" data-name="Stat 2 (Image Placeholder)">
      <ProfessionalUniversityGraduatesAtACampusSetting />
    </div>
  );
}

function ModernOfficeMeetingRoomWithDiverseTeam() {
  return (
    <div className="max-w-[302px] relative shrink-0 size-[302px]" data-name="modern office meeting room with diverse team">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgModernOfficeMeetingRoomWithDiverseTeam} />
      </div>
    </div>
  );
}

function Stat4ImagePlaceholder() {
  return (
    <div className="bg-[rgba(86,86,86,0.2)] col-[1/span_3] content-stretch flex flex-col items-start justify-self-stretch min-h-[250px] overflow-clip relative rounded-[16px] row-2 self-start shrink-0" data-name="Stat 4 (Image Placeholder)">
      <ModernOfficeMeetingRoomWithDiverseTeam />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-white w-full">
        <p className="leading-[48px]">38%</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-full">
        <p className="leading-[20px]">Of our candidates are from STEM backgrounds</p>
      </div>
    </div>
  );
}

function Stat1() {
  return (
    <div className="bg-[#05183f] col-[4/span_4] justify-self-stretch min-h-[250px] relative rounded-[16px] row-2 self-start shrink-0" data-name="Stat 5">
      <div className="content-stretch flex flex-col items-start justify-between min-h-[inherit] p-[32px] relative w-full">
        <Container14 />
        <Container15 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-white w-full">
        <p className="leading-[48px]">51%</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-full">
        <p className="leading-[20px]">Of our candidates are from a Times Top 20 University</p>
      </div>
    </div>
  );
}

function Stat2() {
  return (
    <div className="bg-[#05183f] col-[8/span_5] justify-self-stretch min-h-[250px] relative rounded-[16px] row-2 self-start shrink-0" data-name="Stat 6">
      <div className="content-stretch flex flex-col items-start justify-between min-h-[inherit] p-[32px] relative w-full">
        <Container16 />
        <Container17 />
      </div>
    </div>
  );
}

function Svg7() {
  return (
    <div className="h-[200px] relative shrink-0 w-[250px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 250 200">
        <g id="SVG">
          <path d={svgPaths.p2cd69280} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start opacity-10 right-[0.02px]" data-name="Container">
      <Svg7 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full">
        <p className="leading-[28px]">Candidates registered in our incredible talent pool</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[60px] justify-center leading-[0] not-italic relative shrink-0 text-[60px] text-white w-[134.73px]">
        <p className="leading-[60px]">1.5m</p>
      </div>
      <Container20 />
    </div>
  );
}

function Stat3Featured() {
  return (
    <div className="bg-[#05183f] col-[7/span_6] justify-self-stretch min-h-[250px] relative rounded-[16px] row-1 self-start shrink-0" data-name="Stat 3 (Featured)">
      <div className="min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start min-h-[inherit] pb-[174px] pt-[32px] px-[32px] relative w-full">
          <Container18 />
          <Container19 />
        </div>
      </div>
    </div>
  );
}

function SectionStatsGrid() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[__302px_302px] pt-[96px] relative shrink-0 w-[1280px]" data-name="Section - Stats Grid">
      <Stat />
      <Stat2ImagePlaceholder />
      <Stat4ImagePlaceholder />
      <Stat1 />
      <Stat2 />
      <Stat3Featured />
    </div>
  );
}

function Container22() {
  return (
    <div className="col-1 justify-self-stretch opacity-10 relative row-1 self-center shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[180px] justify-center leading-[0] not-italic relative shrink-0 text-[180px] text-white w-[194.86px]">
          <p className="leading-[180px]">01</p>
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-white w-full">
        <p className="leading-[40px]">Research and Preparation</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[29.25px] not-italic relative shrink-0 text-[#9ca3af] text-[18px] w-full">
        <p className="mb-0">Before we introduce candidates into the process we spend time getting</p>
        <p className="mb-0">to know your company and the role. We will outreach specifically</p>
        <p className="mb-0">relevant candidates, promoting your company and roles to quickly bring</p>
        <p>you the best candidates on the market.</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative w-full">
        <Heading2 />
        <Container24 />
      </div>
    </div>
  );
}

function Step() {
  return (
    <div className="gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_180px] pb-[49px] pt-[48px] relative shrink-0 w-full" data-name="Step 01">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Container22 />
      <Container23 />
    </div>
  );
}

function Container25() {
  return (
    <div className="col-1 justify-self-stretch opacity-10 relative row-1 self-center shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[180px] justify-center leading-[0] not-italic relative shrink-0 text-[180px] text-white w-[230.89px]">
          <p className="leading-[180px]">02</p>
        </div>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-white w-full">
        <p className="leading-[40px]">Advertising and Headhunting</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[29.25px] not-italic relative shrink-0 text-[#9ca3af] text-[18px] w-full">
        <p className="mb-0">Targeted emails to our talent pool, inbound interest from market leading</p>
        <p className="mb-0">websites, and comprehensive online outreach will generate an</p>
        <p className="mb-0">exceptional response. We will proactively approach relevant candidates,</p>
        <p className="mb-0">promoting your company and roles to quickly bring you the best</p>
        <p>candidates on the market.</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative w-full">
        <Heading3 />
        <Container27 />
      </div>
    </div>
  );
}

function Step1() {
  return (
    <div className="gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_202.25px] pb-[49px] pt-[48px] relative shrink-0 w-full" data-name="Step 02">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container28() {
  return (
    <div className="col-1 justify-self-stretch opacity-10 relative row-1 self-center shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[180px] justify-center leading-[0] not-italic relative shrink-0 text-[180px] text-white w-[233.27px]">
          <p className="leading-[180px]">03</p>
        </div>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-white w-full">
        <p className="leading-[40px]">Screening and Interviews</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[29.25px] not-italic relative shrink-0 text-[#9ca3af] text-[18px] w-full">
        <p className="mb-0">We thoroughly screen all applicants fairly using a combination of</p>
        <p className="mb-0">human-centric methods and carefully developed AI tools. This includes</p>
        <p className="mb-0">a two-tiered telephone interview based around your requirements. We</p>
        <p className="mb-0">will pitch your opportunity and present you each candidate profile</p>
        <p>summarizing what makes them stand out.</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative w-full">
        <Heading4 />
        <Container30 />
      </div>
    </div>
  );
}

function Step2() {
  return (
    <div className="gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_202.25px] pb-[49px] pt-[48px] relative shrink-0 w-full" data-name="Step 03">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Container28 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch opacity-10 relative row-1 self-center shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[180px] justify-center leading-[0] not-italic relative shrink-0 text-[180px] text-white w-[238.63px]">
        <p className="leading-[180px]">04</p>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-white w-full">
        <p className="leading-[40px]">Coaching and Management</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[29.25px] not-italic relative shrink-0 text-[#9ca3af] text-[18px] w-full">
        <p className="mb-0">We have an exceptional reputation for providing a positive candidate</p>
        <p className="mb-0">experience. We will organize your interviews, thoroughly prepare the</p>
        <p className="mb-0">candidates and manage the feedback process, all the way through to</p>
        <p>offer and acceptance.</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Heading5 />
      <Container33 />
    </div>
  );
}

function Step3() {
  return (
    <div className="gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_180px] py-[48px] relative shrink-0 w-full" data-name="Step 04">
      <Container31 />
      <Container32 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Step />
      <Step1 />
      <Step2 />
      <Step3 />
    </div>
  );
}

function ProcessSection() {
  return (
    <div className="bg-[#201c25] relative shrink-0 w-full" data-name="Process Section">
      <div className="content-stretch flex flex-col items-start pb-[96px] pt-[192px] px-[80px] relative w-full">
        <Container21 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[672px] relative shrink-0 w-[672px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[56px] justify-center leading-[28px] not-italic relative shrink-0 text-[#565656] text-[18px] text-center w-[628.16px]">
        <p className="mb-0">{`Every hiring challenge is different - that's why we offer a range of ways to`}</p>
        <p>support you, overcome challenges, and exceed your hiring targets.</p>
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] justify-center leading-[32px] not-italic relative shrink-0 text-[24px] text-white w-full">
        <p className="mb-0">Recruitment Process</p>
        <p>Outsourcing</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[22.75px] not-italic relative shrink-0 text-[14px] text-white w-full">
        <p className="mb-0">Tap into a vast range of recruitment process</p>
        <p className="mb-0">outsourcing solutions designed for the early talent</p>
        <p>marketplace.</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col gap-[14.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading6 />
      <Container38 />
    </div>
  );
}

function Svg8() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24.0035">
        <g id="SVG">
          <path d={svgPaths.p254e2200} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg8 />
    </div>
  );
}

function Svg9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p59c4ac8} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-0 relative shrink-0" data-name="Container">
      <Svg9 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Container41 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-name="Margin">
      <Container39 />
    </div>
  );
}

function ServiceCard() {
  return (
    <div className="bg-[#0055d5] col-1 justify-self-stretch min-h-[350px] relative rounded-[16px] row-1 self-start shrink-0" data-name="Service Card 1">
      <div className="content-stretch flex flex-col items-start justify-between min-h-[inherit] p-[32px] relative w-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_0_0.42px_0] rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" data-name="Service Card 1:shadow" />
        <Container37 />
        <Margin />
      </div>
    </div>
  );
}

function Svg10() {
  return (
    <div className="h-[36px] relative shrink-0 w-[22.5px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 36">
        <g id="SVG">
          <path d={svgPaths.p2d562300} fill="var(--fill-0, #9CA3AF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg10 />
    </div>
  );
}

function ServiceCard3PlaceholderForNext() {
  return (
    <div className="bg-[#d1d5db] col-3 h-[609.58px] justify-self-stretch min-h-[350px] relative rounded-[16px] row-1 shrink-0" data-name="Service Card 3 (Placeholder for next)">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] p-[32px] relative size-full">
          <Container42 />
        </div>
      </div>
    </div>
  );
}

function BusinessMeetingInOffice() {
  return (
    <div className="aspect-[341.3299865722656/341.3299865722656] relative shrink-0 w-full" data-name="business meeting in office">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-[-100%] max-w-none size-[300%] top-[-100%]" src={imgBusinessMeetingInOffice} />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] justify-center leading-[32px] not-italic relative shrink-0 text-[24px] text-white w-full">
        <p className="mb-0">Recruitment</p>
        <p>Advertising</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-90 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[22.75px] not-italic relative shrink-0 text-[14px] text-white w-full">
        <p className="mb-0">Leverage our extensive online presence across</p>
        <p className="mb-0">web, email and social to reach the early talent</p>
        <p>marketplace.</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col gap-[14.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading7 />
      <Container44 />
    </div>
  );
}

function Svg11() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24.0026">
        <g id="SVG">
          <path d={svgPaths.p2a568900} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg11 />
    </div>
  );
}

function Svg12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p59c4ac8} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-0 relative shrink-0" data-name="Container">
      <Svg12 />
    </div>
  );
}

function Container45() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative w-full">
          <Container46 />
          <Container47 />
        </div>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-name="Margin">
      <Container45 />
    </div>
  );
}

function ServiceCard1() {
  return (
    <div className="bg-[#9ca3af] col-2 justify-self-stretch min-h-[350px] relative rounded-[16px] row-1 self-start shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] shrink-0" data-name="Service Card 2">
      <div className="min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-between min-h-[inherit] p-[32px] relative w-full">
          <BusinessMeetingInOffice />
          <div className="absolute bg-[rgba(0,0,0,0.4)] inset-[0_0_0.5px_0]" data-name="Overlay" />
          <Container43 />
          <Margin1 />
        </div>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_609.58px] relative shrink-0 w-full" data-name="Container">
      <ServiceCard />
      <ServiceCard3PlaceholderForNext />
      <ServiceCard1 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Container35 />
      <Container36 />
    </div>
  );
}

function ServicesCarouselGridSection() {
  return (
    <div className="bg-[#f4f4f4] relative shrink-0 w-full" data-name="Services Carousel/Grid Section">
      <div className="content-stretch flex flex-col items-start px-[80px] py-[96px] relative w-full">
        <Container34 />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-white w-[1034.86px]">
        <p className="leading-[40px]">Get in touch with the early talent recruitment team now.</p>
      </div>
    </div>
  );
}

function Svg13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0016 16">
        <g id="SVG">
          <path d={svgPaths.p583fc00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container49() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Svg13 />
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[42px] py-[18px] relative rounded-[9999px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[70.33px]">
        <p className="leading-[24px]">{`Let's talk`}</p>
      </div>
      <Container49 />
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex items-center justify-between max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Heading8 />
      <Link2 />
    </div>
  );
}

function CtaSection() {
  return (
    <div className="bg-[#0055d5] relative shrink-0 w-full" data-name="CTA Section">
      <div className="content-stretch flex flex-col items-start px-[80px] py-[64px] relative w-full">
        <Container48 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[384px] relative shrink-0 w-[384px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[69px] justify-center leading-[22.75px] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-[373.28px]">
        <p className="mb-0">GRB (Graduate Recruitment Bureau) are part of The GRB</p>
        <p className="mb-0">Group - an award winning, multi-service early talent</p>
        <p>solutions recruitment partner.</p>
      </div>
    </div>
  );
}

function Svg14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[17.5px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5098 20">
        <g id="SVG">
          <path d={svgPaths.p20ca4dc0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <Svg14 />
    </div>
  );
}

function Svg15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[17.5px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 20">
        <g id="SVG">
          <path d={svgPaths.p355b7200} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <Svg15 />
    </div>
  );
}

function Svg16() {
  return (
    <div className="h-[20px] relative shrink-0 w-[17.5px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 20">
        <g id="SVG">
          <path d={svgPaths.p1db6f200} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <Svg16 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[1.66%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.3359 19.3359">
        <g id="Group">
          <path d={svgPaths.p30fa3f60} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3e2b9680} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p189c5a00} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p3e9f3050} fill="var(--fill-0, white)" id="Vector_4" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function Svg17() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <Group />
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <Svg17 />
    </div>
  );
}

function Svg18() {
  return (
    <div className="h-[20px] relative shrink-0 w-[22.5px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 20">
        <g id="SVG">
          <path d={svgPaths.p2efe0380} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <Svg18 />
    </div>
  );
}

function Svg19() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.pc36e800} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Link8() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <Svg19 />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex gap-[16px] h-[21.2px] items-start pt-[1.2px] relative shrink-0 w-full" data-name="Container">
      <Link3 />
      <Link4 />
      <Link5 />
      <Link6 />
      <Link7 />
      <Link8 />
    </div>
  );
}

function Container51() {
  return (
    <div className="col-[1/span_5] content-stretch flex flex-col gap-[30.8px] items-start justify-self-stretch pb-[107.75px] relative row-1 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white tracking-[-1.5px] w-[53.44px]">
        <p className="leading-[36px]">grb.</p>
      </div>
      <Container52 />
      <Container53 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white w-full">
        <p className="leading-[28px]">Sitemap</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">Home</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">Job search</p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">Career advice</p>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">Article hub</p>
      </div>
    </div>
  );
}

function Item4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">Featured employers</p>
      </div>
    </div>
  );
}

function Item5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">Employer services</p>
      </div>
    </div>
  );
}

function Item6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">About us</p>
      </div>
    </div>
  );
}

function Item7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">Contact us</p>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="List">
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

function Container54() {
  return (
    <div className="col-[6/span_3] content-stretch flex flex-col gap-[24px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <Heading9 />
      <List />
    </div>
  );
}

function Heading10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white w-full">
        <p className="leading-[28px]">Legal</p>
      </div>
    </div>
  );
}

function Item8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">Privacy policy</p>
      </div>
    </div>
  );
}

function Item9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">Data protection</p>
      </div>
    </div>
  );
}

function Item10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">{`Terms & conditions`}</p>
      </div>
    </div>
  );
}

function Item11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">Cookie policy</p>
      </div>
    </div>
  );
}

function Item12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
        <p className="leading-[20px]">{`All policies & terms`}</p>
      </div>
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="List">
      <Item8 />
      <Item9 />
      <Item10 />
      <Item11 />
      <Item12 />
    </div>
  );
}

function Container55() {
  return (
    <div className="col-[9/span_4] content-stretch flex flex-col gap-[24px] items-start justify-self-stretch pb-[96px] relative row-1 self-start shrink-0" data-name="Container">
      <Heading10 />
      <List1 />
    </div>
  );
}

function Container50() {
  return (
    <div className="gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_296px] max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Container51 />
      <Container54 />
      <Container55 />
    </div>
  );
}

function Container56() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] w-[334.81px]">
          <p className="leading-[16px]">© 2024 Graduate Recruitment Bureau. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] w-[151.11px]">
          <p className="leading-[16px]">Designed and built by GRB</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex items-center justify-between max-w-[1280px] pt-[33px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <Container56 />
      <Container57 />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#201c25] relative shrink-0 w-full" data-name="Footer">
      <div className="content-stretch flex flex-col gap-[80px] items-start pb-[40px] pt-[80px] px-[80px] relative w-full">
        <Container50 />
        <HorizontalBorder />
      </div>
    </div>
  );
}

function Link9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[-1.2px] w-[42.75px]">
        <p className="leading-[32px]">grb.</p>
      </div>
    </div>
  );
}

function Link10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[74.41px]">
        <p className="leading-[20px]">Job search</p>
      </div>
    </div>
  );
}

function Link11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[81.58px]">
        <p className="leading-[20px]">Job seekers</p>
      </div>
    </div>
  );
}

function Link12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[68.36px]">
        <p className="leading-[20px]">Recruiters</p>
      </div>
    </div>
  );
}

function Link13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[59.92px]">
        <p className="leading-[20px]">About us</p>
      </div>
    </div>
  );
}

function Svg20() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p1d28f8c0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg20 />
    </div>
  );
}

function Link14() {
  return (
    <div className="bg-[#0055d5] content-stretch flex gap-[8px] items-center px-[20px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[74.41px]">
        <p className="leading-[20px]">Job search</p>
      </div>
      <Container58 />
    </div>
  );
}

function Svg21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20.0029">
        <g id="SVG">
          <path d={svgPaths.p3f5e4d00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex items-start pb-[2.5px] pt-[1.5px] relative shrink-0" data-name="Container">
      <Svg21 />
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container59 />
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Nav">
      <Link10 />
      <Link11 />
      <Link12 />
      <Link13 />
      <Link14 />
      <Button3 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-0 px-[48px] py-[16px] top-0 w-[1440px]" data-name="Header">
      <Link9 />
      <Nav />
    </div>
  );
}

export default function Body() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex flex-col items-center relative size-full" data-name="Body">
      <HeroSection />
      <IntroTextSection />
      <SectionPartnerLogos />
      <SectionStatsGrid />
      <ProcessSection />
      <ServicesCarouselGridSection />
      <CtaSection />
      <Footer />
      <Header />
    </div>
  );
}