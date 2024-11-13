import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import axios from "axios";
import Genie from "../../assets/accounts-section/Genie.png";
import { Image } from "react-bootstrap";
import ProgressBar from "../../Components/ProgressBar/progress-bar";
import "./style.css";
import PdfFeaturesModal from "../../Components/PDF-Features-Modal/pdf-modal";
import useWindowWidth from "../../hooks/useWindowWidth";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ReadingBook = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(1200);
  const [pdfUrl, setPdfUrl] = useState("");
  const [userPdfUrl, setUserPdfUrl] = useState("");
  const [scale, setScale] = useState(1.0);
  const [fullScreen, setFullScreen] = useState(false);
  const [isFullScreenOpenBefore, setIsFullScreenOpenBefore] = useState(false);
  const [presentationView, setPresentationView] = useState(false);
  const [twoPageView, setTwoPageView] = useState(false);
  const [wordCheckModal, setWordCheckModal] = useState(false);
  const [textArray, setTextArray] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const [currentPageText, setCurrentPageText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [selectedBookId, setSelectedBookId] = useState(57);
  const [highlightPosition, setHighlightPosition] = useState({
    top: 0,
    left: 0,
  });
  const containerRef = useRef(null);
  const pageRefs = useRef([]);
  const fullScreenRef = useRef(null);
  const defaultPdfUrl =
    "https://api.fictiongenie.com/s3/getFile/?folderName=accounts/fg/stories/LittleRedRidingHood&fileName=LittleRedRidingHood.pdf";

  const updateCanvasSize = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Calculate the canvas width and height based on screen dimensions
    let newWidth, newHeight;
    if (screenWidth <= 320) {
      // iPhone SE and similar
      newWidth = screenWidth - 20;
      newHeight = screenHeight - 200;
    } else if (screenWidth <= 375) {
      // iPhone 6/7/8 and similar
      newWidth = screenWidth - 30;
      newHeight = screenHeight - 250;
    } else if (screenWidth <= 414) {
      // iPhone 6/7/8 Plus and similar
      newWidth = screenWidth - 50;
      newHeight = screenHeight - 300;
    } else if (screenWidth <= 768) {
      // iPad and similar portrait
      newWidth = screenWidth + 1000;
      newHeight = screenHeight + 1000;
    } else if (screenWidth <= 1024) {
      // iPad and similar landscape
      newWidth = screenWidth - 150;
      newHeight = screenHeight;
    } else if (screenWidth <= 1366) {
      // Small laptop/desktop screens
      newWidth = screenWidth - 200;
      newHeight = screenHeight - 1000;
    } else if (screenWidth <= 1920) {
      // Medium laptop/desktop screens
      newWidth = 1200;
      newHeight = 900;
    } else {
      // Large desktop screens
      newWidth = 1600;
      newHeight = 1200;
    }

    // Update the canvas size state
    setCanvasWidth(newWidth);
    setCanvasHeight(newHeight);
  };

  useEffect(() => {
    const resizeHandler = () => {
      updateCanvasSize();
    };
    window.addEventListener("resize", resizeHandler);
    updateCanvasSize();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const handleTextSelection = (bookId) => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (text) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const position = {
        top: rect.top - 150,
        left: rect.left + window.scrollX + rect.width - 70,
      };

      setHighlightPosition(position);
      setSelectedText(text);
      setSelectedBookId(bookId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const pageHeight = containerRef.current.scrollHeight / (numPages || 1);
        const newPageNumber = Math.floor(scrollTop / pageHeight) + 1;
        setPageNumber(newPageNumber);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [numPages]);

  useEffect(() => {
    if (pageRefs.current.length > 0 && pageNumber > 0) {
      pageRefs.current[pageNumber - 1]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [pageNumber]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(userPdfUrl || defaultPdfUrl, {
          responseType: "arraybuffer",
        });
        if (response && response.status === 200) {
          const pdfBlob = new Blob([response.data], {
            type: "application/pdf",
          });
          const pdfUrl = URL.createObjectURL(pdfBlob);
          setPdfUrl(pdfUrl);
        } else {
          console.error("Error fetching PDF:", response);
        }
      } catch (error) {
        console.error("Error fetching PDF:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userPdfUrl]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    pageRefs.current = Array.from({ length: numPages }, () =>
      React.createRef()
    );
  };

  const zoomIn = () => {
    setScale(scale * 1.1);
  };

  const zoomOut = () => {
    setScale(scale / 1.1);
  };

  const toggleTwoPageView = () => {
    setTwoPageView((prev) => !prev);
  };

  const width = useWindowWidth();

  useEffect(() => {
    if (width >= 768) {
      setIsCheck(true);
      if (isCheck) {
        console.log("done",isCheck)
        setTwoPageView((prev) => !prev);
      }
    }
  }, [width,isCheck]);
  // console.log("isCheck" , isCheck)

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      fullScreenRef.current.requestFullscreen().catch((err) => {
        console.error("Failed to enter full screen:", err);
      });
    } else {
      document.exitFullscreen();
    }
    setFullScreen((prev) => !prev);
  };

  useEffect(() => {
    let newValue;
    if (twoPageView) {
      newValue = textArray[pageNumber - 1] + textArray[pageNumber];
    } else {
      newValue = textArray[pageNumber - 1];
    }
    setCurrentPageText(newValue);
  }, [textArray, pageNumber, toggleTwoPageView]);

  return (
    <div>
      <div className="book-wrapper">
        <div className="book-detail-wrap-sub" ref={fullScreenRef}>
          <div className="pdf-nav-bar">
            <ProgressBar
              value={pageNumber}
              maxValue={numPages}
              backgroundColor="#f0f0f0"
              progressBarColor={{ start: "#800080", end: "#ffcc00" }}
              width="100%"
              height="25px"
              pageNumber={pageNumber}
              numPages={numPages}
            />
          </div>
          <div className="pdf-page-btn-container">
            {isLoading && (
              <div className="loader-overlay">
                <div className="loader" />
              </div>
            )}
            <div className="pdf-page-container">
              <div
                style={{
                  scrollbarWidth: "none",
                  width: "100%",
                  maxHeight: "100vh",
                  flexGrow: "",
                  overflowY: "auto",
                }}
                ref={containerRef}
              >
                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                  {Array.from(
                    {
                      length: Math.ceil(numPages / (twoPageView ? 2 : 1)),
                    },
                    (_, index) => (
                      <div
                        key={`page-group_${index}`}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {Array.from(
                          { length: twoPageView ? 2 : 1 },
                          (_, pageIndex) => {
                            const pageNumber =
                              index * (twoPageView ? 2 : 1) + pageIndex + 1;
                            return (
                              <div
                                key={`page_${pageNumber}`}
                                style={{
                                  marginRight: twoPageView ? "10px" : "",
                                  marginBottom: "20px",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    border: "0px solid rgba(0, 0, 0, 0.1)",
                                    borderRadius: "5px",
                                    boxShadow:
                                      "-5px 5px 5px rgba(0, 0, 0, 0.5)",
                                    width: presentationView
                                      ? "calc(50% - 5px)"
                                      : "auto",
                                    overflow: "hidden",
                                  }}
                                >
                                  <Page
                                    pageNumber={pageNumber}
                                    scale={scale}
                                    ref={pageRefs.current[pageNumber - 1]}
                                    width={
                                      containerRef.current &&
                                      containerRef.current.clientWidth
                                    }
                                    canvasProps={{
                                      width: canvasWidth,
                                      height: canvasHeight,
                                    }}
                                    onMouseUp={() => {
                                      handleTextSelection(57);
                                    }}
                                    onLoadSuccess={async (page) => {
                                      if (page) {
                                        const text =
                                          await page.getTextContent();
                                        const pageTextArray = text?.items?.map(
                                          (obj) => obj?.str
                                        );
                                        const pageText =
                                          pageTextArray.join(" ");
                                        setTextArray((textArray) => [
                                          ...textArray,
                                          pageText,
                                        ]);
                                      }
                                    }}
                                  />
                                </div>
                                <div />
                              </div>
                            );
                          }
                        )}
                      </div>
                    )
                  )}
                </Document>
              </div>
            </div>
          </div>
          {fullScreen && (
            <div
              className="pdf-genie"
              onClick={() => {
                setFullScreen(false);
                setIsFullScreenOpenBefore(true);
                document.exitFullscreen();
                setWordCheckModal(true);
              }}
            >
              <div className="pdf-animated-image">
                <Image
                  src={Genie}
                  fluid
                  className="blurred-shadow pdf-genie-img"
                />
              </div>
            </div>
          )}
          {!fullScreen && (
            <div
              className="pdf-genie"
              onClick={() => {
                setWordCheckModal(true);
              }}
            >
              <div className="pdf-animated-image">
                <Image
                  src={Genie}
                  fluid
                  className="blurred-shadow pdf-genie-img"
                />
              </div>
            </div>
          )}
        </div>
        <PdfFeaturesModal
          isFullScreenOpenBefore={isFullScreenOpenBefore}
          wordCheckModal={wordCheckModal}
          setWordCheckModal={setWordCheckModal}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          toggleTwoPageView={toggleTwoPageView}
          toggleFullScreen={toggleFullScreen}
          twoPageView={twoPageView}
          setUserPdfUrl={setUserPdfUrl}
          setIsFullScreenOpenBefore={setIsFullScreenOpenBefore}
          currentPageText={currentPageText}
          setCurrentPageText={setCurrentPageText}
          pageNumber={pageNumber}
        />
      </div>
    </div>
  );
};

export default ReadingBook;
