import svgPaths from "./svg-qhb07npv7d";
import imgService from "figma:asset/1bd31e564b919964dec7c96360d704ff906d9cfd.png";
import imgImageBox2 from "figma:asset/25627c74ffdda41d8470f25341589f1e89c4e09c.png";

function Heading1() {
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
      <Heading1 />
    </div>
  );
}

function Svg() {
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

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.7)] w-[168.06px]">
        <p className="leading-[20px]">Expert tips for your resume</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function SmallInfoBox() {
  return (
    <div className="bg-[#05183f] col-[1/span_4] justify-self-stretch min-h-[300px] relative rounded-[24px] row-2 self-start shrink-0" data-name="Small Info Box">
      <div className="flex flex-col justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-end min-h-[inherit] pb-[32px] pt-[200px] px-[32px] relative w-full">
          <Heading4Margin />
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[48px] not-italic relative shrink-0 text-[48px] text-white w-full">
        <p className="mb-0">Finding you the</p>
        <p>right role</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[512px] relative shrink-0 w-[512px]" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[56px] justify-center leading-[28px] not-italic relative shrink-0 text-[18px] text-[rgba(255,255,255,0.8)] w-[494.23px]">
        <p className="mb-0">Our dedicated consultants work across all sectors to find roles</p>
        <p>that match your skills and aspirations.</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container5 />
    </div>
  );
}

function MainBlueBox() {
  return (
    <div className="bg-[#0055d5] col-[1/span_8] justify-self-stretch min-h-[400px] relative rounded-[24px] row-1 self-start shrink-0" data-name="Main Blue Box">
      <div className="flex flex-col justify-end min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-end min-h-[inherit] pb-[48px] pt-[184px] px-[48px] relative w-full">
          <Container4 />
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

function Svg1() {
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
      <Svg1 />
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

function Heading2() {
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
      <Heading2 />
    </div>
  );
}

function Svg2() {
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

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg2 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.7)] w-[66.16px]">
        <p className="leading-[20px]">5 min read</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_0.01px_0_0] items-start justify-end p-[40px]" data-name="Container">
      <ImgIconMargin />
      <Heading4Margin1 />
      <Container7 />
    </div>
  );
}

function ImageBox() {
  return (
    <div className="col-[9/span_4] h-[400px] justify-self-stretch min-h-[400px] overflow-clip relative rounded-[24px] row-1 shrink-0" data-name="Image Box 1">
      <Service />
      <div className="absolute bg-gradient-to-b from-[rgba(5,24,63,0)] inset-[0_0.01px_0_0] to-[#05183f]" data-name="Gradient" />
      <Container6 />
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

function Svg3() {
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

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg3 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.7)] w-[138.53px]">
        <p className="leading-[20px]">Master your technique</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start justify-end p-[40px]" data-name="Container">
      <Heading4Margin2 />
      <Container11 />
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
      <Container10 />
    </div>
  );
}

function Container() {
  return (
    <div className="gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[__400px_300px] max-w-[1600px] relative shrink-0 w-full" data-name="Container">
      <SmallInfoBox />
      <MainBlueBox />
      <ImageBox />
      <ImageBox1 />
    </div>
  );
}

export default function SectionServiceGrid() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[48px] py-[80px] relative size-full" data-name="Section - Service Grid">
      <Container />
    </div>
  );
}