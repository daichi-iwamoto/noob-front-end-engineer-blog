import React, { useEffect, useState } from "react"

const BackgroundWave = () => {
  const [wave01top, setScroll01] = useState(0)
  const [wave02top, setScroll02] = useState(300)
  const [wave03top, setScroll03] = useState(500)
  const [wave04top, setScroll04] = useState(200)

  function scroll() {
    const offsetY = window.pageYOffset
    setScroll01(offsetY*0.8)
    setScroll02(300 + (offsetY*0.6))
    setScroll03(500 + (window.pageYOffset*0.3))
    setScroll04(200 + (window.pageYOffset*0.7))
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", scroll)
    }

    watchScroll()
    scroll()

    return () => {
      window.removeEventListener("scroll", scroll)
    }
  })

  const wave01 = {
    top: wave01top
  }
  const wave02 = {
    top: wave02top
  }
  const wave03 = {
    top: wave03top
  }
  const wave04 = {
    top: wave04top
  }

  return (
    <section>
      <div className='waves wave01' style={wave01}>
        <svg viewBox='0 0 320 640' fill="#ffa2b7">
          <path className="wave01-1" d="M144.78 44.93C216.15 3.37 300.88 60.95 301.86 121.45C302.83 181.94 234.22 179.46 234.59 254.58C234.95 329.7 177.38 344.09 175.24 386.45C173.09 428.82 242.59 426.86 238.49 498.13C234.39 569.4 147.98 598.62 93.24 599.01C56.75 599.28 25.67 612.94 0 640L0 0C48.94 57.66 97.2 72.63 144.78 44.93Z"></path>
        </svg>
      </div>
      <div className="waves wave02" style={wave02}>
        <svg viewBox='0 0 640 640' fill="#ffa2b7">
          <path d="M477.97 73.51C454.59 132.89 516.65 146.96 512.08 239.16C507.5 331.36 390.7 349.87 394.85 480.7C397.62 567.92 479.33 621.75 640 642.2L640 0C547.57 9.41 493.57 33.91 477.97 73.51Z"></path>
        </svg>
      </div>
      <div className="waves wave03" style={wave03}>
        <svg viewBox='0 0 640 640' fill="#51585a">
          <path d="M358.69 207.23C369.09 188.98 395.73 186.24 411.97 194.82C428.21 203.39 451.2 240.16 390.07 276.57C328.94 312.97 356.86 387.43 314.16 419.64C271.46 451.84 216.72 438.43 198.83 406.5C180.95 374.56 197.37 321.09 234.6 301.39C271.82 281.68 299.38 296.28 330.22 276.57C361.06 256.86 348.28 225.47 358.69 207.23Z"></path>
        </svg>
      </div>
      <div className="waves wave04" style={wave04}>
        <svg viewBox='0 0 640 640' fill="#51585a">
          <path d="M318.9 412.66C320.91 437.4 292.62 466.47 257.15 458.46C221.68 450.46 201.28 365.82 243.97 308.9C286.66 251.98 269.24 238.28 282.42 198.5C295.6 158.72 345.08 158.9 373.77 181.63C402.45 204.36 407.6 260.06 380.66 292.44C353.73 324.83 315.66 310.09 301.67 335.36C287.67 360.63 316.89 387.92 318.9 412.66Z"></path>
        </svg>
      </div>
    </section>
  )
}

export default BackgroundWave
