import svgPaths from "./svg-m84481qw1h";
import imgProfessionalUniversityGraduatesAtACampusSetting from "figma:asset/faa5fd23107f3ca30d3cb898258a17bdbc0c0579.png";
import imgModernOfficeMeetingRoomWithDiverseTeam from "figma:asset/27567b061e51e6ece0dbb0c62decee860d8deabf.png";

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-white w-full">
        <p className="leading-[48px]">71%</p>
      </div>
    </div>
  );
}

function Container1() {
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
        <Container />
        <Container1 />
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

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-white w-full">
        <p className="leading-[48px]">38%</p>
      </div>
    </div>
  );
}

function Container3() {
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
        <Container2 />
        <Container3 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-white w-full">
        <p className="leading-[48px]">51%</p>
      </div>
    </div>
  );
}

function Container5() {
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
        <Container4 />
        <Container5 />
      </div>
    </div>
  );
}

function Svg() {
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

function Container6() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start opacity-10 right-[0.02px]" data-name="Container">
      <Svg />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full">
        <p className="leading-[28px]">Candidates registered in our incredible talent pool</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[60px] justify-center leading-[0] not-italic relative shrink-0 text-[60px] text-white w-[134.73px]">
        <p className="leading-[60px]">1.5m</p>
      </div>
      <Container8 />
    </div>
  );
}

function Stat3Featured() {
  return (
    <div className="bg-[#05183f] col-[7/span_6] justify-self-stretch min-h-[250px] relative rounded-[16px] row-1 self-start shrink-0" data-name="Stat 3 (Featured)">
      <div className="min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start min-h-[inherit] pb-[174px] pt-[32px] px-[32px] relative w-full">
          <Container6 />
          <Container7 />
        </div>
      </div>
    </div>
  );
}

export default function SectionStatsGrid() {
  return (
    <div className="bg-white gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[__302px_302px] px-[80px] py-[96px] relative size-full" data-name="Section - Stats Grid">
      <Stat />
      <Stat2ImagePlaceholder />
      <Stat4ImagePlaceholder />
      <Stat1 />
      <Stat2 />
      <Stat3Featured />
    </div>
  );
}