function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#e6ff00] text-[20px] w-full">
        <p className="leading-[28px]">grb.</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container1 />
      </div>
    </div>
  );
}

function Container2() {
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

function Container3() {
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

export default function BackgroundBorderOverlayBlur() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(5,24,63,0.95)] content-stretch flex flex-col gap-[11px] items-start p-[25px] relative rounded-[12px] size-full" data-name="Background+Border+OverlayBlur">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container />
      <Container2 />
      <Container3 />
    </div>
  );
}