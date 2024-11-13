import React from "react";
import { Button, Modal } from "react-bootstrap";

const DashboardLangModal = (props) => {
  const {
    showLangOption,
    setShowLangOption,
    possiblelanguages,
    navigateToBook,
  } = props;

  return (
    <>
      <div className="language-modal">
        {showLangOption && (
          <Modal
            show={showLangOption}
            onHide={() => setShowLangOption(false)}
            animation={false}
            size="md"
            centered
          >
            <Modal.Header closeButton className="lang-modal-header">
              <Modal.Title>Please Select a language of book</Modal.Title>
            </Modal.Header>
            <Modal.Body className="lang-modal-body">
              <div className="all-btns-wrap">
                {possiblelanguages.length > 0 &&
                  possiblelanguages?.map((lang) => {
                    return (
                      <Button
                        className="all-btns"
                        variant="warning"
                        onClick={() => navigateToBook(lang)}
                      >
                        {lang?.charAt(0)?.toUpperCase() + lang?.slice(1)}
                      </Button>
                    );
                  })}
              </div>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </>
  );
};

export default DashboardLangModal;
