import {
  Add,
  Delete,
  Done,
  Edit,
  KeyboardBackspace,
  Menu,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  TextField,
  Button,
  Backdrop,
} from "@mui/material";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats, sampleUsers } from "../components/constants/Sampledata";
import UserItem from "../components/shared/UserItem";
const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);
const isMember = false;

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const [IsMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isedit, setisedit] = useState(false);
  const [Groupname, setisGroupname] = useState("");
  const [GroupnameUpdatedValue, setGroupnameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setconfirmDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");
  };
  const openConfirmDeleteHandler = () => {
    setconfirmDeleteDialog(true);
  };
  const closeConfirmDeleteHandler = () => {
    setconfirmDeleteDialog(false);
  };
  const openConfirmAddHandler = () => {};
  const handlemobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const handlemobileclose = () => {
    setIsMobileMenuOpen(false);
  };
  const removeMemberHandler = (id) => {
    console.log("member is removed", id);
  };
  const deleteHandler = () => {};
  useEffect(() => {
    if (chatId) {
      setGroupnameUpdatedValue(`Group Name ${chatId}`);
      setisGroupname(`GroupName ${chatId}`);
    }
    return () => {
      setGroupnameUpdatedValue("");
      setisGroupname("");
      setisedit(false);
    };
  }, [chatId]);
  const Iconbtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <Tooltip title="menu">
          <IconButton onClick={handlemobile}>
            <Menu />
          </IconButton>
        </Tooltip>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "rgba(0,0,0,0.8)",
            color: "white",
            ":hover": {
              bgcolor: "#1c1c1c",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspace />
        </IconButton>
      </Tooltip>
    </>
  );
  console.log("chat id is ", chatId);
  const groupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"2.2rem"}
    >
      {isedit ? (
        <>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            value={GroupnameUpdatedValue}
            onChange={(e) => setGroupnameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={() => setisedit(false)}>
            <Done />
          </IconButton>
        </>
      ) : (
        <>
          {" "}
          <Typography variant="h4">{Groupname}</Typography>
          <IconButton onClick={() => setisedit(true)}>
            <Edit />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const buttongroup = (
    <>
      <Stack
        direction={{
          sm: "row",
          xs: "column-reverse",
        }}
        spacing={"1rem"}
        p={{
          sm: "1rem",
          xs: "0",
          md: "1rem 4rem",
        }}
      >
        <Button
          size="large"
          color="error"
          variant="outlined"
          startIcon={<Delete />}
          onClick={openConfirmDeleteHandler}
        >
          Delete Group
        </Button>
        <Button
          variant="contained"
          size="large"
          startIcon={<Add />}
          onClick={openConfirmAddHandler}
        >
          Add Member
        </Button>
      </Stack>
    </>
  );
  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sm={4}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <GroupList myGroups={sampleChats} />
        {/* //grouplist */}
      </Grid>
      <Grid
        item
        sm={8}
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {" "}
        {Iconbtns}
        {Groupname && (
          <>
            {groupName}
            {/* groupname is edit group name jsx element */}
            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Members
            </Typography>
            <Stack
              maxWidth={"45rem"}
              boxSizing={"border-box"}
              width={"100%"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              {sampleUsers.map((user) => (
                <UserItem
                  key={user._id}
                  user={user}
                  isAdded
                  styling={{
                    boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                    padding: "1rem 2rem",
                    borderRadius: "0.5rem",
                  }}
                  handler={removeMemberHandler}
                />
              ))}
            </Stack>
            {buttongroup}
          </>
        )}
      </Grid>

      {isMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
          {/* //when you click no button it sends the handleclose(like in closeConfirmDeleteHandler sets false so it will dissapper or if you click outside then also it sets false and dissapper like in dialog which is in confirmDeleteDialog) */}
        </Suspense>
      )}
      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={IsMobileMenuOpen}
        onClose={handlemobileclose}
      >
        <GroupList w={"50vh"} myGroups={sampleChats} chatId={chatId} />
      </Drawer>
      {/* //when true the dialog will open then onclose it will shut down */}
    </Grid>
  );
};

const GroupList = ({ chatId, w = "100%", myGroups = [] }) => (
  <Stack
    width={w}
    sx={{
      bgcolor: "#D74B76",
      height: "100vh",
      overflow: "auto",
    }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem chatId={chatId} group={group} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        NoGroups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId == _id) e.preventDefault();
        // ****important for useless renders once loads then it wont load if click the same member
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
