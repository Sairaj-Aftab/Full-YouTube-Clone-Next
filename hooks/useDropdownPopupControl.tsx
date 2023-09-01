import { useEffect, useRef, useState } from "react";

const useDropdownPopupControl = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dropDownRef = useRef<any>(null);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleClickOutSide = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);

    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  return { open, toggleMenu, dropDownRef };
};

export default useDropdownPopupControl;
