import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { POLL_OPTION_IDX } from "../../nonview/core/PollWaitingTime";
import PollOptionView from "../../view/molecules/PollOptionView";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
const STYLE = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  maxWidth: "67%",
  bgcolor: "background.paper",
  p: 4,
};

export default function CommunityViewModal({
  showModal,
  label,
  onOpenModal,
  onCloseModal,
  onSelectPoll,
}) {
  const onClose = function () {
    onCloseModal();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Tooltip title={<Typography>Share your feedback!</Typography>}>
          <IconButton onClick={onOpenModal}>
            <SentimentNeutralIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={STYLE}>
          <Typography variant="caption">
            How long is the wait for
            <strong>{" " + label + " "}</strong>
            now?
          </Typography>
          {Object.entries(POLL_OPTION_IDX).map(function (
            [pollID, pollOption],
            iPollOption
          ) {
            const onClick = async function () {
              await onSelectPoll(pollID);
            };

            return (
              <div key={"poll-option-" + iPollOption}>
                <Button onClick={onClick} sx={{ color: pollOption.color }}>
                  <PollOptionView pollID={pollID} />
                </Button>
              </div>
            );
          })}
        </Box>
      </Modal>
    </Box>
  );
}
