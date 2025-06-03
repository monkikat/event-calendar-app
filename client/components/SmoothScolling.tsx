import ReactLenis from "lenis/react";

const SmoothScrolling = ({ children }: { children: React.ReactNode }) => {

    const lenisOptions = {
        lerp: 0.1,
        duration: 1.5,
        smoothTouch: false,
        smooth: true,
      };


  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;