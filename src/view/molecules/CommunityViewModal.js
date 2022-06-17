import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";

import StringX from "../../nonview/base/StringX";
import { FUEL_IDX } from "../../nonview/core/Fuel";
import { POLL_OPTION_IDX } from "../../nonview/core/PollWaitingTime";

import PollOptionView from "../../view/molecules/PollOptionView";

const STYLE = {
  position: "fixed",
  width: 250,
  maxWidth: "90%",
  height: 300,
  maxHeight: "90vh",

  bottom: "5%",
  right: "5%",
  bgcolor: "background.paper",
  p: 2,
};

export default function CommunityViewModal({
  showModal,
  extendedShed,
  fuelType,
  onOpenModal,
  onCloseModal,
  onSelectPoll,
}) {
  const onClose = function () {
    onCloseModal();
  };

  const fuel = FUEL_IDX[fuelType];

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
          <Typography variant="subtitle2">
            How long is the wait for
            <strong>{" " + fuel.name + " "}</strong>
            at
            <strong>
              {" " + StringX.toTitleCase(extendedShed["shed_name"]) + " "}
            </strong>
            now?
          </Typography>
          {Object.entries(POLL_OPTION_IDX).map(function (
            [pollOptionID, pollOption],
            iPollOption
          ) {
            const onClick = async function () {
              await onSelectPoll(pollOptionID);
            };

            return (
              <div key={"poll-option-" + iPollOption}>
                <Button onClick={onClick} sx={{ color: pollOption.color }}>
                  <PollOptionView pollOptionID={pollOptionID} />
                </Button>
              </div>
            );
          })}
          <Alert severity="info">
            If you have voted multiple times, your latest vote will be selected.
          </Alert>
        </Box>
      </Modal>
    </Box>
  );
}
