import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import PollOptionView, {
  POLL_OPTION_IDX,
} from "../../view/molecules/PollOptionView";

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
  onCloseModal,
  onSelectPoll,
}) {
  const onClose = function () {
    onCloseModal();
  };

  return (
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
  );
}
