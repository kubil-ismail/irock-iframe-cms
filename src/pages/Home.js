/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { memo } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import {
  Button,
  Grid,
  ListItemButton,
  List,
  Typography,
  TextField,
  ListItemText,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

function ButtonComp(props) {
  return (
    <a
      href={props?.[props?.currentPosition]?.event?.link ?? ""}
      target={props?.[props?.currentPosition]?.event?.target ?? "_self"}
    >
      <button
        style={
          props?.[props?.currentPosition]?.style ?? {
            border: "1px solid white",
            background: "none",
            color: "white",
            padding: "10px 20px",
            fontWeight: "normal",
            fontSize: "14px",
            cursor: "pointer",
          }
        }
      >
        {props?.[props?.currentPosition]?.content ?? "Button Text"}
      </button>
    </a>
  );
}

function TextComp(props) {
  return (
    <div>
      <p
        style={{
          ...props?.[props?.currentPosition]?.style
        }}
      >
        {props?.[props?.currentPosition]?.content ?? "Lorem Ipsum"}
      </p>
    </div>
  );
}

function ImageComp(props) {
  return (
    <>
      <img
        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/image-picture-973-svgrepo-com.png"
        alt="image"
      />
    </>
  );
}

function LinkComp(props) {
  return (
    <>
      <a>link test</a>
    </>
  );
}

function HandleContent({ type, props }) {
  switch (type) {
    case "button":
      return <ButtonComp {...props} />;
    case "text":
      return <TextComp {...props} />;
    case "image":
      return <ImageComp {...props} />;
    case "link":
      return <LinkComp {...props} />;
    default:
      return "Unknown";
  }
}

function Home(props) {
  const [collapseFullscreen, setCollapseFullscreen] = React.useState(false);
  const [isInsert, setIsInsert] = React.useState(false);
  const [isOnForm, setIsOnForm] = React.useState(false);
  const [onFormType, setOnFormType] = React.useState(null);
  const [selectedType, setSelectedType] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [contentType, setContentType] = React.useState(null);
  const [selectedFormType, setSelectedFormType] = React.useState(0);
  const [isDouble, setIsDouble] = React.useState(true);
  const [contentPosition, setContentPosition] = React.useState("left");
  const [contentSelectedType, setContentSelectedType] = React.useState({
    left: {
      style: {},
      content: null,
      event: {},
    },
    right: null,
  });

  const handleChangeStyle = (value, styleName) => {
    setContentSelectedType({
      ...contentSelectedType,
      ...{
        [contentPosition]: {
          style: {
            ...contentSelectedType[contentPosition].style,
            ...{ [styleName]: value },
          },
          content: contentSelectedType[contentPosition].content,
        },
      },
    });
  };

  const handleChangeContent = (value) => {
    setContentSelectedType({
      ...contentSelectedType,
      ...{
        [contentPosition]: {
          style: {
            ...contentSelectedType[contentPosition].style,
          },
          content: value,
        },
      },
    });
  };

  const handleChangeEvent = (value, eventName) => {
    setContentSelectedType({
      ...contentSelectedType,
      ...{
        [contentPosition]: {
          style: {
            ...contentSelectedType[contentPosition].style,
          },
          content: contentSelectedType[contentPosition].content,
          event: {
            ...contentSelectedType[contentPosition].event,
            ...{ [eventName]: value },
          },
        },
      },
    });
  };

  return (
    <Box p={2}>
      <Grid container justifyContent="center">
        {!collapseFullscreen && (
          <Grid item xs={3} position="relative">
            <Typography variant="h4" color="secondary">
              Event Page
            </Typography>
            {!isInsert && (
              <Button
                variant="outlined"
                color="secondary"
                sx={{ borderRadius: "50px", borderWidth: "2px", mt: "30px" }}
                onClick={() => setIsInsert(true)}
              >
                + Add Layout
              </Button>
            )}

            {/* Insert Layout step 1 */}
            {isInsert && !onFormType && (
              <>
                <Typography sx={{ mt: 2 }}>Insert Layout</Typography>

                <Box
                  sx={{
                    borderBottom: "2px solid #00a3d3",
                    mt: 1,
                    width: "98%",
                    mb: 2,
                  }}
                />

                <Grid container>
                  <Grid xs={4}>
                    <Box
                      border="1px solid #00a3d3"
                      m={1}
                      p={1}
                      pt={0}
                      mt={0}
                      ml={0}
                      sx={{
                        cursor: "pointer",
                        ...(selectedType === 1
                          ? {
                              border: "2px solid #727CF5",
                            }
                          : {}),
                      }}
                      onClick={() => {
                        setSelectedType(1);
                        setIsOnForm(false);
                        setIsDouble(false);
                      }}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-row-1-col.svg"
                        alt="image"
                        width="100%"
                        height="80px"
                      />
                      <Typography align="center">One Column</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={4}>
                    <Box
                      border="1px solid #00a3d3"
                      m={1}
                      p={1}
                      pt={0}
                      mt={0}
                      sx={{
                        cursor: "pointer",
                        ...(selectedType === 2
                          ? {
                              border: "2px solid #727CF5",
                            }
                          : {}),
                      }}
                      onClick={() => {
                        setSelectedType(2);
                        setIsOnForm(false);
                        setIsDouble(true);
                      }}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-row-2-col.svg"
                        alt="image"
                        width="100%"
                        height="80px"
                      />
                      <Typography align="center">2 Column</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={4}>
                    <Box
                      border="1px solid #00a3d3"
                      m={1}
                      p={1}
                      pt={0}
                      mt={0}
                      mr={1}
                      sx={{
                        cursor: "pointer",
                        ...(selectedType === 3
                          ? {
                              border: "2px solid #727CF5",
                            }
                          : {}),
                      }}
                      onClick={() => {
                        setSelectedType(3);
                        setIsOnForm(false);
                        setIsDouble(true);
                      }}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-row-image-left.svg"
                        alt="image"
                        width="100%"
                        height="80px"
                      />
                      <Typography align="center">Image Left</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={4}>
                    <Box
                      border="1px solid #00a3d3"
                      m={1}
                      p={1}
                      pt={0}
                      ml={0}
                      sx={{
                        cursor: "pointer",
                        ...(selectedType === 4
                          ? {
                              border: "2px solid #727CF5",
                            }
                          : {}),
                      }}
                      onClick={() => {
                        setSelectedType(4);
                        setIsOnForm(false);
                        setIsDouble(true);
                      }}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-row-image-right.svg"
                        alt="image"
                        width="100%"
                        height="80px"
                      />
                      <Typography align="center">Image Right</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    borderTop: "2px solid rgb(56 56 56 / 14%)",
                    mt: 1,
                    width: "98%",
                    mb: 2,
                  }}
                />

                <Grid container gap={1} justifyContent="space-between" px={1}>
                  <Grid item md={5.8}>
                    <Button
                      sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                      fullWidth
                      onClick={() => {
                        setIsInsert(false);
                        setSelectedType(0);
                        setIsDouble(true);
                      }}
                    >
                      Discard
                    </Button>
                  </Grid>
                  <Grid item md={5.8}>
                    <Button
                      sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                      fullWidth
                      disabled={selectedType === 0}
                      onClick={() => {
                        setIsOnForm(true);
                        setOnFormType("options");
                      }}
                    >
                      Apply
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}

            {/* Options step 2 */}
            {isInsert && isOnForm && onFormType === "options" && (
              <>
                <List sx={{ width: "95%" }}>
                  <ListItemButton
                    sx={{ borderBottom: "2px solid #C1C1C1" }}
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
                    <ListItemText primary="Options" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse
                    in={open}
                    timeout="auto"
                    unmountOnExit
                    sx={{ p: 2 }}
                  >
                    <Typography variant="h6">Card Settings</Typography>

                    <Box mt={1} mb={2}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Card label name"
                      />
                    </Box>

                    <Typography variant="h6">Background</Typography>

                    <Box mt={1} mb={2}>
                      <Button
                        component="label"
                        variant="outlined"
                        fullWidth
                        sx={{
                          mb: 2,
                          color: "#C1C1C1",
                          borderColor: "#C1C1C1",
                          "&:hover": {
                            borderColor: "#C1C1C1",
                          },
                        }}
                        size="medium"
                      >
                        Select Media{" "}
                        <input style={{ display: "none" }} type="file" />
                      </Button>
                      <TextField
                        fullWidth
                        type="color"
                        size="small"
                        label="Color"
                      />
                    </Box>

                    <Typography variant="h6">Options</Typography>

                    <Box my={1}>
                      <FormControl size="small" fullWidth>
                        <InputLabel id="visibility">Visibility</InputLabel>
                        <Select labelId="visibility" label="Visibility">
                          <MenuItem value={true}>Visible</MenuItem>
                          <MenuItem value={false}>Hidden</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Collapse>
                </List>

                <Box
                  sx={{
                    backgroundColor: "#2e353b",
                    width: "89%",
                    p: 0.5,
                    px: 2,
                    borderRadius: "5px",
                  }}
                >
                  <Typography color="#fff">Row</Typography>
                </Box>

                <Box
                  sx={{
                    ml: "4%",
                    width: "100%",
                    mt: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#2e353b",
                      width: "85%",
                      p: 0.5,
                      px: 2,
                      borderRadius: "5px",
                    }}
                  >
                    <Typography color="#fff">
                      Column{" "}
                      <span style={{ color: "rgb(193 188 188)" }}>2/2</span>
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="outlined"
                  sx={{
                    ml: "8%",
                    borderRadius: "10px",
                    mt: 1,
                  }}
                  color="secondary"
                  onClick={() => {
                    setOnFormType("element");
                    setContentPosition("left");
                  }}
                >
                  + Add to column
                </Button>

                {isDouble && (
                  <Box mt={2}>
                    <Box
                      sx={{
                        backgroundColor: "#2e353b",
                        width: "89%",
                        p: 0.5,
                        px: 2,
                        borderRadius: "5px",
                      }}
                    >
                      <Typography color="#fff">Row</Typography>
                    </Box>

                    <Box
                      sx={{
                        ml: "4%",
                        width: "100%",
                        mt: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#2e353b",
                          width: "85%",
                          p: 0.5,
                          px: 2,
                          borderRadius: "5px",
                        }}
                      >
                        <Typography color="#fff">
                          Column{" "}
                          <span style={{ color: "rgb(193 188 188)" }}>2/2</span>
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      variant="outlined"
                      sx={{
                        ml: "8%",
                        borderRadius: "10px",
                        mt: 1,
                      }}
                      color="secondary"
                      onClick={() => {
                        setOnFormType("element");
                        setContentPosition("right");
                      }}
                    >
                      + Add to column
                    </Button>
                  </Box>
                )}
              </>
            )}

            {/* Element step 3 */}
            {isInsert && isOnForm && onFormType === "element" && (
              <>
                <Typography sx={{ mt: 2 }}>Insert Content</Typography>

                <Box
                  sx={{
                    borderBottom: "2px solid #00a3d3",
                    mt: 1,
                    width: "98%",
                    mb: 2,
                  }}
                />

                <Grid container>
                  <Grid xs={4}>
                    <Box
                      border="1px solid #00a3d3"
                      m={1}
                      p={1}
                      pt={0}
                      mt={0}
                      ml={0}
                      sx={{
                        cursor: "pointer",
                        ...(selectedFormType === 1
                          ? {
                              border: "2px solid #727CF5",
                            }
                          : {}),
                      }}
                      onClick={() => {
                        setContentType("button");
                        setSelectedFormType(1);
                        setContentSelectedType({
                          left: {
                            style: {},
                            content: null,
                            event: {},
                          },
                          right: null,
                        });
                      }}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-button.svg"
                        alt="image"
                        width="100%"
                        height="80px"
                      />
                      <Typography align="center">Button</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={4}>
                    <Box
                      border="1px solid #00a3d3"
                      m={1}
                      p={1}
                      pt={0}
                      mt={0}
                      sx={{
                        cursor: "pointer",
                        ...(selectedFormType === 2
                          ? {
                              border: "2px solid #727CF5",
                            }
                          : {}),
                      }}
                      onClick={() => {
                        setContentType("text");
                        setSelectedFormType(2);
                        setContentSelectedType({
                          left: {
                            style: {},
                            content: null,
                            event: {},
                          },
                          right: null,
                        });
                      }}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-text.svg"
                        alt="image"
                        width="100%"
                        height="80px"
                      />
                      <Typography align="center">Text</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={4}>
                    <Box
                      border="1px solid #00a3d3"
                      m={1}
                      p={1}
                      pt={0}
                      mt={0}
                      mr={1}
                      sx={{
                        cursor: "pointer",
                        ...(selectedFormType === 3
                          ? {
                              border: "2px solid #727CF5",
                            }
                          : {}),
                      }}
                      onClick={() => {
                        setContentType("image");
                        setSelectedFormType(3);
                        setContentSelectedType({
                          left: {
                            style: {},
                            content: null,
                            event: {},
                          },
                          right: null,
                        });
                      }}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-ux_image.svg"
                        alt="image"
                        width="100%"
                        height="80px"
                      />
                      <Typography align="center">Image</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={4}>
                    <Box
                      border="1px solid #00a3d3"
                      m={1}
                      p={1}
                      pt={0}
                      ml={0}
                      sx={{
                        cursor: "pointer",
                        ...(selectedFormType === 4
                          ? {
                              border: "2px solid #727CF5",
                            }
                          : {}),
                      }}
                      onClick={() => {
                        setContentType("link");
                        setSelectedFormType(4);
                        setContentSelectedType({
                          left: {
                            style: {},
                            content: null,
                            event: {},
                          },
                          right: null,
                        });
                      }}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-link.svg"
                        alt="image"
                        width="100%"
                        height="80px"
                      />
                      <Typography align="center">Link</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    borderTop: "2px solid rgb(56 56 56 / 14%)",
                    mt: 1,
                    width: "98%",
                    mb: 2,
                  }}
                />

                <Grid container gap={1} justifyContent="space-between" px={1}>
                  <Grid item md={5.8}>
                    <Button
                      sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                      fullWidth
                      onClick={() => {
                        setOnFormType("options");
                      }}
                    >
                      Discard
                    </Button>
                  </Grid>
                  <Grid item md={5.8}>
                    <Button
                      sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                      fullWidth
                      disabled={selectedFormType === 0}
                      onClick={() => {
                        setIsOnForm(true);
                        setOnFormType("content");
                      }}
                    >
                      Apply
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}

            {/* Button */}
            {isInsert &&
              isOnForm &&
              onFormType === "content" &&
              selectedFormType === 1 && (
                <>
                  <Box pr={2}>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      Button
                    </Typography>

                    <Box mt={1} mb={2}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Text"
                        margin="dense"
                        multiline
                        rows={4}
                        onChange={(e) => handleChangeContent(e.target.value)}
                      />

                      <FormControl size="small" margin="dense" fullWidth>
                        <InputLabel id="Letter_case">Letter Case</InputLabel>
                        <Select
                          labelId="Letter_case"
                          onChange={(e) => {
                            handleChangeStyle(e.target.value, "textTransform");
                          }}
                          label="Letter Case"
                        >
                          <MenuItem value="uppercase">Uppercase</MenuItem>
                          <MenuItem value="capitalize">Capitalize</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl size="small" margin="dense" fullWidth>
                        <InputLabel id="Color">Color</InputLabel>
                        <Select labelId="Color" label="Color">
                          <MenuItem value={true}>Primary</MenuItem>
                          <MenuItem value={false}>Secondary</MenuItem>
                          <MenuItem value={false}>Alert</MenuItem>
                          <MenuItem value={false}>Success</MenuItem>
                          <MenuItem value={false}>White</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl size="small" margin="dense" fullWidth>
                        <InputLabel id="Style">Style</InputLabel>
                        <Select labelId="Style" label="Style">
                          <MenuItem value={true}>Default</MenuItem>
                          <MenuItem value={false}>Outline</MenuItem>
                          <MenuItem value={false}>Simple</MenuItem>
                          <MenuItem value={false}>Underline</MenuItem>
                          <MenuItem value={false}>Shade</MenuItem>
                          <MenuItem value={false}>Bevel</MenuItem>
                          <MenuItem value={false}>Gloss</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl size="small" margin="dense" fullWidth>
                        <InputLabel id="Size">Size</InputLabel>
                        <Select labelId="Size" label="Size">
                          <MenuItem value={true}>XX-Small</MenuItem>
                          <MenuItem value={false}>X-Small</MenuItem>
                          <MenuItem value={false}>Smaller</MenuItem>
                          <MenuItem value={false}>Small</MenuItem>
                          <MenuItem value={false}>Normal</MenuItem>
                          <MenuItem value={false}>Large</MenuItem>
                          <MenuItem value={false}>Larger</MenuItem>
                          <MenuItem value={false}>X-Larger</MenuItem>
                          <MenuItem value={false}>XX-Larger</MenuItem>
                        </Select>
                      </FormControl>

                      <Typography sx={{ mt: 1 }}>Padding</Typography>
                      <Box display="flex" gap={1}>
                        <TextField
                          size="small"
                          label="Top"
                          margin="dense"
                          variant="outlined"
                          type="number"
                          onChange={(e) =>
                            handleChangeStyle(
                              `${e.target.value}px`,
                              "paddingTop"
                            )
                          }
                        />
                        <TextField
                          size="small"
                          label="Right"
                          margin="dense"
                          variant="outlined"
                          type="number"
                          onChange={(e) =>
                            handleChangeStyle(
                              `${e.target.value}px`,
                              "paddingRight"
                            )
                          }
                        />
                        <TextField
                          size="small"
                          label="Bottom"
                          margin="dense"
                          variant="outlined"
                          type="number"
                          onChange={(e) =>
                            handleChangeStyle(
                              `${e.target.value}px`,
                              "paddingBottom"
                            )
                          }
                        />
                        <TextField
                          size="small"
                          label="Left"
                          margin="dense"
                          variant="outlined"
                          type="number"
                          onChange={(e) =>
                            handleChangeStyle(
                              `${e.target.value}px`,
                              "paddingLeft"
                            )
                          }
                        />
                      </Box>

                      <TextField
                        fullWidth
                        size="small"
                        label="Radius"
                        margin="dense"
                        type="range"
                        variant="outlined"
                        onChange={(e) =>
                          handleChangeStyle(`${e.target.value}px`, "width")
                        }
                      />

                      <FormControl size="small" margin="dense" fullWidth>
                        <InputLabel id="Expand">Expand</InputLabel>
                        <Select labelId="Expand" label="Expand">
                          <MenuItem value={true}>True</MenuItem>
                          <MenuItem value={false}>False</MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        fullWidth
                        size="small"
                        label="Link"
                        margin="dense"
                        variant="outlined"
                        onChange={(e) =>
                          handleChangeEvent(e.target.value, "link")
                        }
                      />

                      <FormControl size="small" margin="dense" fullWidth>
                        <InputLabel id="Target">Target</InputLabel>
                        <Select
                          labelId="Target"
                          onChange={(e) =>
                            handleChangeEvent(e.target.value, "target")
                          }
                          label="Visibility"
                        >
                          <MenuItem value="_self">Same window</MenuItem>
                          <MenuItem value="_blank">New window</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Typography variant="h6">Options</Typography>

                    <Box my={1}>
                      <FormControl size="small" fullWidth>
                        <InputLabel id="visibility">Visibility</InputLabel>
                        <Select
                          labelId="visibility"
                          label="Visibility"
                          onChange={(e) => {
                            if (e.target.value === true) {
                              handleChangeStyle("block", "display");
                              handleChangeStyle("inherit", "visibility");
                            } else {
                              handleChangeStyle("none", "display");
                              handleChangeStyle("hidden", "visibility");
                            }
                          }}
                        >
                          <MenuItem value={true}>Visible</MenuItem>
                          <MenuItem value={false}>Hidden</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box
                      sx={{
                        borderTop: "2px solid rgb(56 56 56 / 14%)",
                        mt: 3,
                        width: "98%",
                        mb: 2,
                      }}
                    />

                    <Grid
                      container
                      gap={1}
                      justifyContent="space-between"
                      px={1}
                    >
                      <Grid item md={5.8}>
                        <Button
                          sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                          fullWidth
                          onClick={() => {
                            setOnFormType("element");
                          }}
                        >
                          Discard
                        </Button>
                      </Grid>
                      <Grid item md={5.8}>
                        <Button
                          sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                          fullWidth
                          disabled={selectedFormType === 0}
                          onClick={() => {
                            setIsOnForm(true);
                            setOnFormType("content");
                          }}
                        >
                          Apply
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              )}

            {/* Typhography */}
            {isInsert &&
              isOnForm &&
              onFormType === "content" &&
              selectedFormType === 2 && (
                <Box pr={2}>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Text
                  </Typography>

                  <Box mt={1} mb={2}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Content"
                      margin="dense"
                      multiline
                      rows={4}
                      onChange={(e) => handleChangeContent(e.target.value)}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="Font Size"
                      margin="dense"
                      type="range"
                      variant="outlined"
                      onChange={(e) =>
                        handleChangeStyle(`${e.target.value}px`, "fontSize")
                      }
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="Line Height"
                      margin="dense"
                      type="range"
                      variant="outlined"
                      onChange={(e) =>
                        handleChangeStyle(`${e.target.value}px`, "lineHeight")
                      }
                    />
                    <FormControl size="small" margin="dense" fullWidth>
                      <InputLabel id="text_align">Text Align</InputLabel>
                      <Select
                        labelId="text_align"
                        onChange={(e) =>
                          handleChangeStyle(e.target.value, "textAlign")
                        }
                        label="Text Align"
                      >
                        <MenuItem value="unset">None</MenuItem>
                        <MenuItem value="left">Left</MenuItem>
                        <MenuItem value="center">Center</MenuItem>
                        <MenuItem value="right">Right</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      size="small"
                      label="Text Color"
                      margin="dense"
                      type="color"
                      variant="outlined"
                      onChange={(e) =>
                        handleChangeStyle(e.target.value, "color")
                      }
                    />
                  </Box>

                  <Typography variant="h6">Options</Typography>

                  <Box my={1}>
                    <FormControl size="small" fullWidth>
                      <InputLabel id="visibility">Visibility</InputLabel>
                      <Select
                        labelId="visibility"
                        onChange={(e) => {
                          if (e.target.value === true) {
                            handleChangeStyle("block", "display");
                            handleChangeStyle("inherit", "visibility");
                          } else {
                            handleChangeStyle("none", "display");
                            handleChangeStyle("hidden", "visibility");
                          }
                        }}
                        label="Visibility"
                      >
                        <MenuItem value={true}>Visible</MenuItem>
                        <MenuItem value={false}>Hidden</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box
                    sx={{
                      borderTop: "2px solid rgb(56 56 56 / 14%)",
                      mt: 3,
                      width: "98%",
                      mb: 2,
                    }}
                  />

                  <Grid container gap={1} justifyContent="space-between" px={1}>
                    <Grid item md={5.8}>
                      <Button
                        sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                        fullWidth
                        onClick={() => {
                          setOnFormType("element");
                        }}
                      >
                        Discard
                      </Button>
                    </Grid>
                    <Grid item md={5.8}>
                      <Button
                        sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                        fullWidth
                        disabled={selectedFormType === 0}
                        onClick={() => {
                          setIsOnForm(true);
                          setOnFormType("content");
                        }}
                      >
                        Apply
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}

            {/* Media */}
            {isInsert &&
              isOnForm &&
              onFormType === "content" &&
              selectedFormType === 3 && (
                <>
                  <Box pr={2}>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      Image
                    </Typography>

                    <Box mt={1} mb={2}>
                      <Button
                        component="label"
                        variant="outlined"
                        fullWidth
                        sx={{
                          mb: 2,
                          color: "#C1C1C1",
                          borderColor: "#C1C1C1",
                          "&:hover": {
                            borderColor: "#C1C1C1",
                          },
                        }}
                        size="medium"
                      >
                        Select Media{" "}
                        <input style={{ display: "none" }} type="file" />
                      </Button>

                      <TextField
                        fullWidth
                        size="small"
                        label="Width"
                        margin="dense"
                        type="range"
                        variant="outlined"
                      />

                      <Typography sx={{ mt: 1 }}>Margin</Typography>
                      <Box display="flex" gap={1}>
                        <TextField
                          size="small"
                          label="Top"
                          margin="dense"
                          variant="outlined"
                        />
                        <TextField
                          size="small"
                          label="Right"
                          margin="dense"
                          variant="outlined"
                        />
                        <TextField
                          size="small"
                          label="Bottom"
                          margin="dense"
                          variant="outlined"
                        />
                        <TextField
                          size="small"
                          label="Left"
                          margin="dense"
                          variant="outlined"
                        />
                      </Box>

                      <TextField
                        fullWidth
                        size="small"
                        label="Link"
                        margin="dense"
                        variant="outlined"
                      />

                      <FormControl size="small" margin="dense" fullWidth>
                        <InputLabel id="Target">Target</InputLabel>
                        <Select labelId="Target" label="Visibility">
                          <MenuItem value={true}>Same window</MenuItem>
                          <MenuItem value={false}>New window</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Typography variant="h6">Options</Typography>

                    <Box my={1}>
                      <FormControl size="small" fullWidth>
                        <InputLabel id="visibility">Visibility</InputLabel>
                        <Select labelId="visibility" label="Visibility">
                          <MenuItem value={true}>Visible</MenuItem>
                          <MenuItem value={false}>Hidden</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box
                      sx={{
                        borderTop: "2px solid rgb(56 56 56 / 14%)",
                        mt: 3,
                        width: "98%",
                        mb: 2,
                      }}
                    />

                    <Grid
                      container
                      gap={1}
                      justifyContent="space-between"
                      px={1}
                    >
                      <Grid item md={5.8}>
                        <Button
                          sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                          fullWidth
                          onClick={() => {
                            setOnFormType("element");
                          }}
                        >
                          Discard
                        </Button>
                      </Grid>
                      <Grid item md={5.8}>
                        <Button
                          sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                          fullWidth
                          disabled={selectedFormType === 0}
                          onClick={() => {
                            setIsOnForm(true);
                            setOnFormType("content");
                          }}
                        >
                          Apply
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              )}

            {/* Link */}
            {isInsert &&
              isOnForm &&
              onFormType === "content" &&
              selectedFormType === 4 && (
                <Box pr={2}>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Link
                  </Typography>

                  <Box mt={1} mb={2}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Text"
                      margin="dense"
                      onChange={(e) => handleChangeContent(e.target.value)}
                    />
                    <FormControl size="small" margin="dense" fullWidth>
                      <InputLabel id="Letter_case">Letter Case</InputLabel>
                      <Select labelId="Letter_case" label="Letter Case">
                        <MenuItem value={true}>Uppercase</MenuItem>
                        <MenuItem value={false}>Capitalize</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl size="small" margin="dense" fullWidth>
                      <InputLabel id="Style">Style</InputLabel>
                      <Select labelId="Style" label="Visibility">
                        <MenuItem value={true}>Default</MenuItem>
                        <MenuItem value={false}>Underline</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      size="small"
                      label="Link"
                      margin="dense"
                      onChange={(e) =>
                        handleChangeEvent(e.target.value, "link")
                      }
                    />
                    <FormControl size="small" margin="dense" fullWidth>
                      <InputLabel id="Target">Target</InputLabel>
                      <Select
                        labelId="Target"
                        onChange={(e) =>
                          handleChangeEvent(e.target.value, "target")
                        }
                        label="Visibility"
                      >
                        <MenuItem value="_self">Same window</MenuItem>
                        <MenuItem value="_blank">New window</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Typography variant="h6">Options</Typography>

                  <Box my={1}>
                    <FormControl size="small" fullWidth>
                      <InputLabel id="visibility">Visibility</InputLabel>
                      <Select labelId="visibility" label="Visibility">
                        <MenuItem value={true}>Visible</MenuItem>
                        <MenuItem value={false}>Hidden</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box
                    sx={{
                      borderTop: "2px solid rgb(56 56 56 / 14%)",
                      mt: 3,
                      width: "98%",
                      mb: 2,
                    }}
                  />

                  <Grid container gap={1} justifyContent="space-between" px={1}>
                    <Grid item md={5.8}>
                      <Button
                        sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                        fullWidth
                        onClick={() => {
                          setOnFormType("element");
                        }}
                      >
                        Discard
                      </Button>
                    </Grid>
                    <Grid item md={5.8}>
                      <Button
                        sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                        fullWidth
                        disabled={selectedFormType === 0}
                        onClick={() => {
                          setIsOnForm(true);
                          setOnFormType("content");
                        }}
                      >
                        Apply
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}

            <Box
              position="absolute"
              borderTop="1px solid #cacaca"
              width="95%"
              bottom={0}
              pt="10px"
            >
              <Button
                sx={{ backgroundColor: "#ff0016", color: "#fff", mr: 1, px: 3 }}
              >
                Save
              </Button>
              <Button
                sx={{ backgroundColor: "#727cf5", color: "#fff", px: 3 }}
                onClick={() => {
                  setIsInsert(false);
                  setSelectedType(0);
                  setIsDouble(true);
                  setOnFormType(null);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        )}

        <Grid item xs={collapseFullscreen ? 11.5 : 8.5} position="relative">
          <Typography variant="h3" color="secondary">
            Add Card
          </Typography>
          <Box
            sx={{
              background: "#555555",
              width: "100%",
              height: "80vh",
              marginTop: "30px",
              padding: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {isInsert && selectedType === 1 && (
              <Box
                sx={{
                  minHeight: "50%",
                  width: "100%",
                  backgroundColor: "rgb(193, 193, 193)",
                  border: "3px dashed #00a3d3",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    minHeight: "380px",
                    backgroundColor: "rgb(193, 193, 193)",
                    border: "3px dashed #00a3d3",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {contentType ? (
                    HandleContent({
                      type: contentType,
                      props: {
                        ...contentSelectedType,
                        currentPosition: contentPosition,
                      },
                    })
                  ) : (
                    <Box
                      component="button"
                      sx={{
                        background: "none",
                        border: "none",
                        color: "#00a3d3",
                        cursor: "pointer",
                      }}
                    >
                      Add Elements
                    </Box>
                  )}
                </Box>
              </Box>
            )}

            {isInsert && selectedType === 2 && (
              <Box
                sx={{
                  minHeight: "50%",
                  width: "100%",
                  backgroundColor: "rgb(193, 193, 193)",
                  border: "3px dashed #00a3d3",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    minHeight: "380px",
                    backgroundColor: "rgb(193, 193, 193)",
                    border: "3px dashed #00a3d3",
                    borderRadius: "10px",
                  }}
                >
                  {contentType ? (
                    HandleContent({
                      type: contentType,
                      props: {
                        ...contentSelectedType,
                        currentPosition: contentPosition,
                      },
                    })
                  ) : (
                    <Box
                      component="button"
                      sx={{
                        background: "none",
                        border: "none",
                        color: "#00a3d3",
                        cursor: "pointer",
                      }}
                      onClick={() => setOnFormType("element")}
                    >
                      Add Elements
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    width: "50%",
                    minHeight: "380px",
                    backgroundColor: "rgb(193, 193, 193)",
                    border: "3px dashed #00a3d3",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="button"
                    sx={{
                      background: "none",
                      border: "none",
                      color: "#00a3d3",
                      cursor: "pointer",
                    }}
                    onClick={() => setOnFormType("element")}
                  >
                    {contentType ? HandleContent(contentType) : "Add elements"}
                  </Box>
                </Box>
              </Box>
            )}

            {isInsert && selectedType === 3 && (
              <Box
                sx={{
                  minHeight: "50%",
                  width: "100%",
                  backgroundColor: "rgb(193, 193, 193)",
                  border: "3px dashed #00a3d3",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    minHeight: "380px",
                    backgroundColor: "rgb(193, 193, 193)",
                    border: "3px dashed #00a3d3",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="button"
                    sx={{
                      background: "none",
                      border: "none",
                      color: "#00a3d3",
                      cursor: "pointer",
                    }}
                  >
                    Upload Image
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "50%",
                    minHeight: "380px",
                    backgroundColor: "rgb(193, 193, 193)",
                    border: "3px dashed #00a3d3",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="button"
                    sx={{
                      background: "none",
                      border: "none",
                      color: "#00a3d3",
                      cursor: "pointer",
                    }}
                    onClick={() => setOnFormType("element")}
                  >
                    {contentType ? HandleContent(contentType) : "Add elements"}
                  </Box>
                </Box>
              </Box>
            )}

            {isInsert && selectedType === 4 && (
              <Box
                sx={{
                  minHeight: "50%",
                  width: "100%",
                  backgroundColor: "rgb(193, 193, 193)",
                  border: "3px dashed #00a3d3",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    minHeight: "380px",
                    backgroundColor: "rgb(193, 193, 193)",
                    border: "3px dashed #00a3d3",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="button"
                    sx={{
                      background: "none",
                      border: "none",
                      color: "#00a3d3",
                      cursor: "pointer",
                    }}
                    onClick={() => setOnFormType("element")}
                  >
                    {contentType ? HandleContent(contentType) : "Add elements"}
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "50%",
                    minHeight: "380px",
                    backgroundColor: "rgb(193, 193, 193)",
                    border: "3px dashed #00a3d3",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="button"
                    sx={{
                      background: "none",
                      border: "none",
                      color: "#00a3d3",
                      cursor: "pointer",
                    }}
                  >
                    Upload Image
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              background: "#1010109e",
              display: "flex",
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: -15,
              bottom: 10,
              cursor: "pointer",
            }}
            onClick={() => setCollapseFullscreen(!collapseFullscreen)}
          >
            {!collapseFullscreen ? (
              <ArrowBackIosRoundedIcon
                htmlColor="#b9b9b9"
                fontSize="20px"
                sx={{ marginLeft: "-2px" }}
              />
            ) : (
              <ArrowForwardIosRoundedIcon
                htmlColor="#b9b9b9"
                fontSize="20px"
                sx={{ marginLeft: "-2px" }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

Home.propTypes = {};

const mapStateToProps = (state) => ({
  example: state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Home));
