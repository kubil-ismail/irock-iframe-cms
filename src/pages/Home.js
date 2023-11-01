/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { memo } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import {
  Switch,
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
  Tooltip,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import Swal from "sweetalert2";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import http from "utils/http";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

function Home(props) {
  const { pageSection } = useParams();
  const [collapseFullscreen, setCollapseFullscreen] = React.useState(false);
  const [isInsert, setIsInsert] = React.useState(false);
  const [isOnForm, setIsOnForm] = React.useState(false);
  const [onFormType, setOnFormType] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedFormType, setSelectedFormType] = React.useState(0);
  const [isDouble, setIsDouble] = React.useState(true);
  const [cardName, setCardName] = React.useState("Default");

  // new logic
  const [selectedType, setSelectedType] = React.useState(0);
  const [contentPosition, setContentPosition] = React.useState(null);
  const [contentType, setContentType] = React.useState(null);
  const [contentType2, setContentType2] = React.useState({
    left: null,
    right: null,
  });

  // core dari card
  const [styleLayout, setStyleLayout] = React.useState({}); // untuk parent
  const [contentSelectedType, setContentSelectedType] = React.useState({}); // untuk kolom
  const [styleSelectedType, setStyleSelectedType] = React.useState({}); // style
  const [eventSelectedType, setEventSelectedType] = React.useState({}); // event handler
  // core dari card

  const [leftColumnLength, setLeftColumnLength] = React.useState(1);
  const [rightColumnLength, setRightColumnLength] = React.useState(1);
  const [leftColumnSelected, setLeftColumnSelected] = React.useState(0);
  const [leftElementList, setLeftElementList] = React.useState({});
  const [leftElementDeleteList, setLeftElementDeleteList] = React.useState([]);

  let showSection = pageSection;

  function formatPageSection(showSection) {
    return showSection
      .split(/[_-]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  let formattedPageSection = formatPageSection(showSection);

  const handleChangeStyle = (value) => {
    // Dapatkan elemen yang ingin Anda ubah gayanya
    const elementToUpdate =
      contentSelectedType?.[
        `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
      ]?.content;

    // // Buat elemen baru dengan gaya yang diubah
    const updatedElement = React.cloneElement(elementToUpdate, {
      style: value,
    });

    setStyleSelectedType({
      ...styleSelectedType,
      ...{
        [`${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`]:
          value,
      },
    });

    // Perbarui elemen dalam state contentSelectedType
    contentSelectedType[
      `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
    ].content = updatedElement;
  };

  const handleChangeContent = (value) => {
    setContentSelectedType({
      ...contentSelectedType,
      ...{
        [`${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`]:
          {
            content: value,
          },
      },
    });
  };

  const handleChangeEvent = (value) => {
    // Dapatkan elemen yang ingin Anda ubah event-nya
    const elementToUpdate =
      contentSelectedType?.[
        `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
      ]?.content;

    // Buat elemen baru dengan event yang diubah
    const updatedElement = React.cloneElement(elementToUpdate, {
      onClick: () => {
        if (value.link) {
          if (value.target === "_blank") {
            window.open(value.link, value.target);
          } else {
            window.open(value.link, value.target);
          }
        }
      }, // Ganti dengan event yang Anda inginkan
    });

    setEventSelectedType({
      ...eventSelectedType,
      ...{
        [`${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`]:
          value,
      },
    });

    // Perbarui elemen dalam state contentSelectedType
    contentSelectedType[
      `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
    ].content = updatedElement;
  };

  const HandleContent = (props) => {
    const { layout, type, position, value } = props;

    setContentSelectedType({
      ...contentSelectedType,
      ...{
        [`${layout}_${type}_${position}_${leftColumnSelected}`]: value,
      },
    });
  };

  const handleUpload = async (props, type) => {
    try {
      var formData = new FormData();
      formData.append("image", props.target.files[0]);
      formData.append("name", type);

      return await http.post("/ui-build/img-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {}
  };

  const handleSave2 = async () => {
    // Dapatkan elemen yang sesuai
    const contentElement = document.querySelector(
      `#content_tipe_${selectedType}`
    );

    // Dapatkan konten teks dari elemen tersebut
    const contentText = contentElement.outerHTML;

    http
      .post("/ui-build/save-new-card", {
        type: "card_v2",
        title: cardName,
        content: contentText,
        section: pageSection,
      })
      .then(() => {
        Swal.fire({
          title: "",
          html: "Success add card.",
          icon: "success",
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        });

        window.parent.postMessage(
          { type: "saveComplete", section: pageSection },
          "*"
        );
      });
  };

  const handleSave = async () => {
    if (showInFAQ) {
      // jika show in FAQ ON
      const divElement = document.createElement("div");
      divElement.id = scrollId;
      divElement.style.width = "100%";
      divElement.style.height = "50px";
      divElement.style.marginTop = "-50px";
      divElement.innerHTML = "<div></div>";
      const contentHTML = divElement.outerHTML;

      const contentElement = document.querySelector(
        `#content_tipe_${selectedType}`
      );

      const contentText = contentElement.outerHTML;

      const newId = await http.post("/ui-build/save-new-card", {
        type: "card_v2",
        title: `#${scrollId}`,
        content: contentHTML,
        section: pageSection,
        parameter: "show_in_faq",
        sharetext: cardName,
      });

      http
        .post("/ui-build/save-new-card", {
          type: "card_v2",
          title: cardName,
          content: contentText,
          section: pageSection,
        })
        .then(() => {
          Swal.fire({
            title: "",
            html: "Success add card.",
            icon: "success",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
          });

          window.parent.postMessage(
            { type: "saveComplete", section: pageSection },
            "*"
          );
        });
    } else {
      // jika show in FAQ off
      const contentElement = document.querySelector(
        `#content_tipe_${selectedType}`
      );

      const contentText = contentElement.outerHTML;

      http
        .post("/ui-build/save-new-card", {
          type: "card_v2",
          title: cardName,
          content: contentText,
          section: pageSection,
        })
        .then(() => {
          Swal.fire({
            title: "",
            html: "Success add card.",
            icon: "success",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
          });

          window.parent.postMessage(
            { type: "saveComplete", section: pageSection },
            "*"
          );
        });
    }
  };

  const handleDeleteElement = (position, index) => {
    let temporaryObject = { ...contentSelectedType };
    setLeftElementDeleteList([
      ...leftElementDeleteList,
      ...[`${position}_${index}`],
    ]);

    Object.keys(temporaryObject)?.forEach((element) => {
      if (contentSelectedType[element].position === `${position}_${index}`) {
        delete temporaryObject[element];
      }
    });

    setContentSelectedType(temporaryObject);
  };

  const handleChangeBorderRadius = (e) => {
    const selectedRadius = `${e.target.value}px`;
    const leftKolom = document.getElementById("leftKolom");

    if (leftKolom) {
      leftKolom.style.borderRadius = selectedRadius;

      const children = leftKolom.children;
      for (let i = 0; i < children.length; i++) {
        children[i].style.borderRadius = selectedRadius;
      }
    }
  };

  const handleChangeBorderRadiusKanan = (e) => {
    const selectedRadius = `${e.target.value}px`;
    const rightKolom = document.getElementById("rightKolom");

    if (rightKolom) {
      rightKolom.style.borderRadius = selectedRadius;

      const children = rightKolom.children;
      for (let i = 0; i < children.length; i++) {
        children[i].style.borderRadius = selectedRadius;
      }
    }
  };

  const [linkValue, setLinkValue] = React.useState("");
  const [targetValue, setTargetValue] = React.useState("_self");
  const [textContent, setTextContent] = React.useState("");
  const [fontSizeValue, setFontSizeValue] = React.useState("");
  const [fontWeightValue, setFontWeightValue] = React.useState("normal");
  const [lineHeightValue, setLineHeightValue] = React.useState("1");
  const [textColorValue, setTextColorValue] = React.useState("");
  const [letterCaseValue, setLetterCaseValue] = React.useState("none");
  const [styleValue, setStyleValue] = React.useState("none");

  const handleChangeLink = (value) => {
    setLinkValue(value);
    updateAnchorElement(value, targetValue, textContent, {
      fontSize: fontSizeValue,
      fontWeight: fontWeightValue,
      lineHeight: lineHeightValue,
      color: textColorValue,
      textTransform: letterCaseValue,
      textDecoration: styleValue,
    });
  };

  const handleChangeTarget = (value) => {
    setTargetValue(value);
    updateAnchorElement(linkValue, value, textContent, {
      fontSize: fontSizeValue,
      fontWeight: fontWeightValue,
      lineHeight: lineHeightValue,
      color: textColorValue,
      textTransform: letterCaseValue,
      textDecoration: styleValue,
    });
  };

  const handleChangeTextContent = (value) => {
    setTextContent(value);
    updateAnchorElement(linkValue, targetValue, value, {
      fontSize: fontSizeValue,
      fontWeight: fontWeightValue,
      lineHeight: lineHeightValue,
      color: textColorValue,
      textTransform: letterCaseValue,
      textDecoration: styleValue,
    });
  };

  const handleChangeFontSize = (value) => {
    setFontSizeValue(value);
    const fontSizeString = `${value}px`;
    updateAnchorElement(linkValue, targetValue, textContent, {
      fontSize: fontSizeString,
      fontWeight: fontWeightValue,
      lineHeight: lineHeightValue,
      color: textColorValue,
      textTransform: letterCaseValue,
      textDecoration: styleValue,
    });
  };

  const handleChangeLineHeight = (value) => {
    setLineHeightValue(value);
    updateAnchorElement(linkValue, targetValue, textContent, {
      fontSize: fontSizeValue,
      fontWeight: fontWeightValue,
      lineHeight: value,
      color: textColorValue,
      textTransform: letterCaseValue,
      textDecoration: styleValue,
    });
  };

  const handleChangeFontWeight = (value) => {
    setFontWeightValue(value);
    updateAnchorElement(linkValue, targetValue, textContent, {
      fontSize: fontSizeValue,
      fontWeight: value,
      lineHeight: lineHeightValue,
      color: textColorValue,
      textTransform: letterCaseValue,
      textDecoration: styleValue,
    });
  };

  const handleChangeTextColor = (value) => {
    setTextColorValue(value);
    updateAnchorElement(linkValue, targetValue, textContent, {
      fontSize: fontSizeValue,
      fontWeight: fontWeightValue,
      lineHeight: lineHeightValue,
      color: value,
      textTransform: letterCaseValue,
      textDecoration: styleValue,
    });
  };

  const handleChangeLetterCase = (value) => {
    setLetterCaseValue(value);
    updateAnchorElement(linkValue, targetValue, textContent, {
      fontSize: fontSizeValue,
      fontWeight: fontWeightValue,
      lineHeight: lineHeightValue,
      color: textColorValue,
      textTransform: value,
      textDecoration: styleValue,
    });
  };

  const handleChangeStyleLink = (value) => {
    setStyleValue(value);
    updateAnchorElement(linkValue, targetValue, textContent, {
      fontSize: fontSizeValue,
      fontWeight: fontWeightValue,
      lineHeight: lineHeightValue,
      color: textColorValue,
      textTransform: letterCaseValue,
      textDecoration: value,
    });
  };

  const updateAnchorElement = (link, target, content, style) => {
    const updatedElement = (
      <span>
        <a
          href={link}
          target={target}
          style={{
            ...styleSelectedType?.[
              `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
            ],
            color: "inherit",
            textDecoration: "inherit",
            ...style,
          }}
        >
          {content}
        </a>
      </span>
    );

    setContentSelectedType((prevContentSelectedType) => ({
      ...prevContentSelectedType,
      [`${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`]:
        {
          content: updatedElement,
        },
    }));

    setEventSelectedType((prevEventSelectedType) => ({
      ...prevEventSelectedType,
      [`${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`]:
        {
          link,
          target,
          style,
        },
    }));
  };

  const [showInFAQ, setShowInFAQ] = React.useState(false);
  const [scrollId, setScrollId] = React.useState("");

  return (
    <Box p={2}>
      <Grid container justifyContent="center">
        {!collapseFullscreen && (
          <Grid item xs={2.5} position="relative">
            <Typography variant="h4" color="secondary">
              {formattedPageSection} page
            </Typography>
            <div
              style={{
                height: "100%",
                overflowX: "hidden",
                overflowY: "auto",
                maxHeight: "calc(100% - 80px)",
                position: "absolute",
                width: "calc(100% - 10px)",
              }}
            >
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
                    <Grid xs={6}>
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
                    <Grid xs={6}>
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
                      <Box mt={1} mb={2}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={showInFAQ}
                              onChange={(e) => setShowInFAQ(e.target.checked)}
                              name="showInFAQ"
                            />
                          }
                          label="Show in FAQ menu"
                        />

                        {showInFAQ && (
                          <TextField
                            fullWidth
                            size="small"
                            label="Scroll Id"
                            value={scrollId}
                            onChange={(e) => {
                              const newValue = e.target.value
                                .toLowerCase()
                                .replace(/\s+/g, "-")
                                .replace(/[^a-z0-9-]/g, "");
                              setScrollId(newValue);
                            }}
                          />
                        )}
                      </Box>

                      <Typography variant="h6">Card Settings</Typography>

                      <Box mt={1} mb={2}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Card label name"
                          onChange={(e) => setCardName(e.target.value)}
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
                          <input
                            style={{ display: "none" }}
                            onChange={(e) =>
                              handleUpload(e, "layoutBackground").then(
                                (result) => {
                                  setStyleLayout({
                                    ...styleLayout,
                                    ...{
                                      backgroundImage: `url(${result?.data?.image?.url})`,
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                    },
                                  });
                                }
                              )
                            }
                            type="file"
                          />
                        </Button>
                        <TextField
                          fullWidth
                          type="color"
                          size="small"
                          label="Color"
                          sx={{ mb: 3 }}
                          onChange={(e) => {
                            setStyleLayout({
                              ...styleLayout,
                              ...{ backgroundColor: e.target.value },
                            });
                          }}
                        />
                        <TextField
                          fullWidth
                          type="range"
                          size="small"
                          label="Border Radius"
                          onChange={(e) => {
                            setStyleLayout({
                              ...styleLayout,
                              ...{ borderRadius: `${e.target.value}px` },
                            });
                          }}
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
                                setStyleLayout({
                                  ...styleLayout,
                                  ...{
                                    display: "block",
                                    visibility: "inherit",
                                  },
                                });
                              } else {
                                setStyleLayout({
                                  ...styleLayout,
                                  ...{ display: "none", visibility: "hidden" },
                                });
                              }
                            }}
                            label="Visibility"
                          >
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
                      mt: 1,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#2e353b",
                        width: "85%",
                        p: 0.5,
                        px: 2,
                        mb: 1,
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      // onClick={() => {
                      //   setContentPosition("left");
                      //   // setLeftElementList(key);
                      //   // setRightElementList(null);
                      // }}
                    >
                      <Typography
                        color="#fff"
                        onClick={() => {
                          setOnFormType("column_option_left");
                          setContentPosition("left");
                        }}
                      >
                        {/* kolom kiri */}
                        Column{" "}
                        <span style={{ color: "rgb(193 188 188)" }}>
                          1/{isDouble ? 2 : 1}
                        </span>
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      ml: "9%",
                      width: "100%",
                    }}
                  >
                    {[...new Array(leftColumnLength)].map((item, key) => {
                      const next = 1 + key;

                      if (
                        !leftElementDeleteList.find(
                          (items) => items === `left_${next}`
                        )
                      ) {
                        return (
                          <Box
                            sx={{
                              backgroundColor: "#2e353b",
                              width: "80%",
                              p: 0.5,
                              px: 2,
                              mb: 1,
                              borderRadius: "5px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              onClick={() => {
                                setContentPosition("left");
                                setLeftColumnSelected(next);

                                if (leftElementList[`left_${next}`]) {
                                  setContentType(
                                    leftElementList[`left_${next}`]
                                  );
                                  if (
                                    leftElementList[`left_${next}`] === "button"
                                  ) {
                                    setSelectedFormType(1);
                                  } else if (
                                    leftElementList[`left_${next}`] === "text"
                                  ) {
                                    setSelectedFormType(2);
                                  } else if (
                                    leftElementList[`left_${next}`] === "image"
                                  ) {
                                    setSelectedFormType(3);
                                  } else if (
                                    leftElementList[`left_${next}`] === "link"
                                  ) {
                                    setSelectedFormType(4);
                                  }
                                  setOnFormType("content");
                                } else {
                                  setOnFormType("element");
                                }
                              }}
                              style={{ width: "100%" }}
                            >
                              <Typography
                                color="#fff"
                                sx={{
                                  textTransform: "capitalize",
                                  display: "block",
                                }}
                              >
                                {leftElementList[`left_${next}`]
                                  ? leftElementList[`left_${next}`]
                                  : "Element"}{" "}
                                <span style={{ color: "rgb(193 188 188)" }}>
                                  {next}/{leftColumnLength}
                                </span>
                              </Typography>
                            </div>
                            {leftColumnLength > 1 ? (
                              <div
                                onClick={() => {
                                  if (
                                    window.confirm("Want delete this item ?")
                                  ) {
                                    handleDeleteElement("left", next);
                                  }
                                }}
                              >
                                <Tooltip title="Delete element" arrow>
                                  <CloseIcon htmlColor="#fff" fontSize="12px" />
                                </Tooltip>
                              </div>
                            ) : null}
                          </Box>
                        );
                      }
                    })}
                  </Box>

                  <Button
                    variant="outlined"
                    sx={{
                      ml: "8%",
                      borderRadius: "10px",
                      mt: 1,
                    }}
                    onClick={() => {
                      const next = leftColumnLength + 1;
                      setLeftColumnLength(next);
                      setContentPosition("left");
                      setOnFormType("element");
                      setLeftColumnSelected(next);
                      // const next = leftElementList + 1;
                      // setLeftElementList(next);
                    }}
                    color="secondary"
                  >
                    + Add element
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
                            mb: 1,
                            px: 2,
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          <Typography
                            color="#fff"
                            onClick={() => {
                              setOnFormType("column_option_right");
                              setContentPosition("right");
                            }}
                          >
                            {/* Kolom Kanan */}
                            Column{" "}
                            <span style={{ color: "rgb(193 188 188)" }}>
                              2/2
                            </span>
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          ml: "9%",
                          width: "100%",
                        }}
                      >
                        {[...new Array(rightColumnLength)].map((item, key) => {
                          const next = 1 + key;
                          if (
                            !leftElementDeleteList.find(
                              (items) => items === `right_${next}`
                            )
                          ) {
                            return (
                              <Box
                                sx={{
                                  backgroundColor: "#2e353b",
                                  width: "80%",
                                  p: 0.5,
                                  px: 2,
                                  mb: 1,
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div
                                  onClick={() => {
                                    setOnFormType("element");
                                    setContentPosition("right");
                                    setLeftColumnSelected(next);

                                    if (leftElementList[`right_${next}`]) {
                                      setContentType(
                                        leftElementList[`right_${next}`]
                                      );
                                      if (
                                        leftElementList[`right_${next}`] ===
                                        "button"
                                      ) {
                                        setSelectedFormType(1);
                                      } else if (
                                        leftElementList[`right_${next}`] ===
                                        "text"
                                      ) {
                                        setSelectedFormType(2);
                                      } else if (
                                        leftElementList[`right_${next}`] ===
                                        "image"
                                      ) {
                                        setSelectedFormType(3);
                                      } else if (
                                        leftElementList[`right_${next}`] ===
                                        "link"
                                      ) {
                                        setSelectedFormType(4);
                                      }
                                      setOnFormType("content");
                                    } else {
                                      setOnFormType("element");
                                    }

                                    // setContentType("text");
                                    // setSelectedFormType(2);
                                  }}
                                  style={{ width: "100%" }}
                                >
                                  <Typography
                                    color="#fff"
                                    sx={{ textTransform: "capitalize" }}
                                  >
                                    {leftElementList[`right_${next}`]
                                      ? leftElementList[`right_${next}`]
                                      : "Element"}{" "}
                                    <span style={{ color: "rgb(193 188 188)" }}>
                                      {next}/{leftColumnLength}
                                    </span>
                                  </Typography>
                                </div>

                                {rightColumnLength > 1 ? (
                                  <div
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          "Want delete this item ?"
                                        )
                                      ) {
                                        handleDeleteElement("right", next);
                                      }
                                    }}
                                  >
                                    <Tooltip title="Delete element" arrow>
                                      <CloseIcon
                                        htmlColor="#fff"
                                        fontSize="12px"
                                      />
                                    </Tooltip>
                                  </div>
                                ) : null}
                              </Box>
                            );
                          }
                        })}
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
                          const next = rightColumnLength + 1;
                          setRightColumnLength(next);
                          setOnFormType("element");
                          setContentPosition("right");
                          setLeftColumnSelected(next);
                        }}
                      >
                        + Add to column
                      </Button>
                    </Box>
                  )}
                </>
              )}

              {/* Column Option Left */}
              {isInsert && isOnForm && onFormType === "column_option_left" && (
                <>
                  <Typography sx={{ mt: 2 }}>Column Option</Typography>

                  <Box
                    sx={{
                      borderBottom: "2px solid #00a3d3",
                      mt: 1,
                      width: "98%",
                      mb: 2,
                    }}
                  />

                  <TextField
                    fullWidth
                    type="color"
                    size="small"
                    label="Color"
                    sx={{ mb: 3 }}
                    onChange={(e) => {
                      const selectedColor = e.target.value;
                      const leftKolom = document.getElementById("leftKolom");

                      if (leftKolom) {
                        leftKolom.style.backgroundColor = selectedColor;
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    type="range"
                    size="small"
                    label="Border Radius"
                    onChange={handleChangeBorderRadius}
                  />
                  <FormControl size="small" margin="dense" fullWidth>
                    <InputLabel id="column_left_align">Text Align</InputLabel>
                    <Select
                      labelId="column_left_align"
                      onChange={(e) => {
                        const leftKolom = document.getElementById("leftKolom");

                        if (leftKolom) {
                          leftKolom.style.textAlign = e.target.value;
                        }
                      }}
                      label="Text Align"
                    >
                      <MenuItem value="unset">None</MenuItem>
                      <MenuItem value="left">Left</MenuItem>
                      <MenuItem value="center">Center</MenuItem>
                      <MenuItem value="right">Right</MenuItem>
                    </Select>
                  </FormControl>

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
                        // disabled={selectedFormType === 0}
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

              {/* Column Option Right */}
              {isInsert && isOnForm && onFormType === "column_option_right" && (
                <>
                  <Typography sx={{ mt: 2 }}>Column Option</Typography>

                  <Box
                    sx={{
                      borderBottom: "2px solid #00a3d3",
                      mt: 1,
                      width: "98%",
                      mb: 2,
                    }}
                  />

                  <TextField
                    fullWidth
                    type="color"
                    size="small"
                    label="Color"
                    sx={{ mb: 3 }}
                    onChange={(e) => {
                      const selectedColor = e.target.value;
                      const rightKolom = document.getElementById("rightKolom");

                      if (rightKolom) {
                        rightKolom.style.backgroundColor = selectedColor;
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    type="range"
                    size="small"
                    label="Border Radius"
                    onChange={handleChangeBorderRadiusKanan}
                    // onChange={(e) => {
                    //   const selectedRadius = `${e.target.value}px`;
                    //   const rightKolom = document.getElementById("rightKolom");

                    //   if (rightKolom) {
                    //     rightKolom.style.borderRadius = selectedRadius;
                    //   }
                    // }}
                  />

                  <FormControl size="small" margin="dense" fullWidth>
                    <InputLabel id="column_right_align">Text Align</InputLabel>
                    <Select
                      labelId="column_right_align"
                      onChange={(e) => {
                        const rightKolom =
                          document.getElementById("rightKolom");

                        if (rightKolom) {
                          rightKolom.style.textAlign = e.target.value;
                        }
                      }}
                      label="Text Align"
                    >
                      <MenuItem value="unset">None</MenuItem>
                      <MenuItem value="left">Left</MenuItem>
                      <MenuItem value="center">Center</MenuItem>
                      <MenuItem value="right">Right</MenuItem>
                    </Select>
                  </FormControl>

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
                        // disabled={selectedFormType === 0}
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
                    <Grid xs={6}>
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

                          setLeftElementList({
                            ...leftElementList,
                            ...{
                              [`${contentPosition}_${leftColumnSelected}`]:
                                "button",
                            },
                          });

                          HandleContent({
                            layout: selectedType,
                            position: contentPosition,
                            type: "button",
                            value: {
                              position: `${contentPosition}_${leftColumnSelected}`,
                              style: {},
                              content: (
                                <button
                                  style={
                                    contentSelectedType?.[
                                      `${selectedType}_button_${contentPosition}_${leftColumnSelected}`
                                    ]?.content?.props?.style ?? {}
                                  }
                                >
                                  {contentSelectedType?.[
                                    `${selectedType}_button_${contentPosition}_${leftColumnSelected}`
                                  ]?.content?.props?.children ??
                                    "insert content"}
                                </button>
                              ),
                              event: {},
                            },
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
                    <Grid xs={6}>
                      <Box
                        border="1px solid #00a3d3"
                        m={1}
                        p={1}
                        pt={0}
                        mt={0}
                        ml={0}
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
                          setLeftElementList({
                            ...leftElementList,
                            ...{
                              [`${contentPosition}_${leftColumnSelected}`]:
                                "text",
                            },
                          });

                          HandleContent({
                            layout: selectedType,
                            position: contentPosition,
                            type: "text",
                            value: {
                              position: `${contentPosition}_${leftColumnSelected}`,
                              style: {},
                              content: (
                                <p
                                  style={
                                    contentSelectedType?.[
                                      `${selectedType}_text_${contentPosition}_${leftColumnSelected}`
                                    ]?.content?.props?.style ?? {}
                                  }
                                >
                                  {contentSelectedType?.[
                                    `${selectedType}_text_${contentPosition}_${leftColumnSelected}`
                                  ]?.content?.props?.children ?? "Test"}
                                </p>
                              ),
                              event: {},
                            },
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
                    <Grid xs={6}>
                      <Box
                        border="1px solid #00a3d3"
                        m={1}
                        p={1}
                        pt={0}
                        mt={0}
                        ml={0}
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
                          setLeftElementList({
                            ...leftElementList,
                            ...{
                              [`${contentPosition}_${leftColumnSelected}`]:
                                "image",
                            },
                          });
                          HandleContent({
                            layout: selectedType,
                            position: contentPosition,
                            type: "image",
                            value: {
                              position: `${contentPosition}_${leftColumnSelected}`,
                              style: {},
                              content: (
                                <img
                                  style={
                                    contentSelectedType?.[
                                      `${selectedType}_image_${contentPosition}_${leftColumnSelected}`
                                    ]?.content?.props?.style ?? {}
                                  }
                                  alt="image"
                                  src={
                                    contentSelectedType?.[
                                      `${selectedType}_image_${contentPosition}_${leftColumnSelected}`
                                    ]?.content?.props?.src ??
                                    "https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/image-picture-973-svgrepo-com.png"
                                  }
                                />
                              ),
                              event: {},
                            },
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
                    <Grid xs={6}>
                      <Box
                        border="1px solid #00a3d3"
                        m={1}
                        p={1}
                        pt={0}
                        mt={0}
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
                          setLeftElementList({
                            ...leftElementList,
                            ...{
                              [`${contentPosition}_${leftColumnSelected}`]:
                                "link",
                            },
                          });

                          HandleContent({
                            layout: selectedType,
                            position: contentPosition,
                            type: "link",
                            value: {
                              position: `${contentPosition}_${leftColumnSelected}`,
                              style: {},
                              content: (
                                <a
                                  style={
                                    contentSelectedType?.[
                                      `${selectedType}_link_${contentPosition}_${leftColumnSelected}`
                                    ]?.content?.props?.style ?? {}
                                  }
                                  href="#"
                                >
                                  {contentSelectedType?.[
                                    `${selectedType}_link_${contentPosition}_${leftColumnSelected}`
                                  ]?.content?.props?.children ?? "Link"}
                                </a>
                              ),
                              event: {},
                            },
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
                          defaultValue={
                            contentSelectedType?.[
                              `${selectedType}_button_${contentPosition}_${leftColumnSelected}`
                            ]?.content?.props?.children ?? ""
                          }
                          onChange={(e) =>
                            handleChangeContent(
                              <button
                                style={
                                  styleSelectedType?.[
                                    `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                  ]
                                }
                              >
                                {e.target.value}
                              </button>
                            )
                          }
                        />

                        <FormControl size="small" margin="dense" fullWidth>
                          <InputLabel id="Letter_case">Letter Case</InputLabel>
                          <Select
                            labelId="Letter_case"
                            onChange={(e) => {
                              handleChangeStyle({
                                ...(styleSelectedType?.[
                                  `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                ] ?? {}),
                                ...{ textTransform: e.target.value },
                              });
                            }}
                            label="Letter Case"
                            defaultValue={
                              styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ]?.textTransform
                            }
                          >
                            <MenuItem value="uppercase">Uppercase</MenuItem>
                            <MenuItem value="capitalize">Capitalize</MenuItem>
                          </Select>
                        </FormControl>

                        <TextField
                          fullWidth
                          size="small"
                          label="Background Color"
                          margin="dense"
                          type="color"
                          defaultValue={
                            styleSelectedType?.[
                              `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                            ]?.backgroundColor
                          }
                          onChange={(e) => {
                            handleChangeStyle({
                              ...(styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ] ?? {}),
                              ...{
                                backgroundColor: e.target.value,
                                borderColor: e.target.value,
                              },
                            });
                          }}
                        />

                        <TextField
                          fullWidth
                          size="small"
                          label="Text Color"
                          margin="dense"
                          type="color"
                          defaultValue={
                            styleSelectedType?.[
                              `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                            ]?.color
                          }
                          onChange={(e) => {
                            handleChangeStyle({
                              ...(styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ] ?? {}),
                              ...{
                                color: e.target.value,
                              },
                            });
                          }}
                        />

                        <FormControl size="small" margin="dense" fullWidth>
                          <InputLabel id="Style">Style</InputLabel>
                          <Select
                            labelId="Style"
                            defaultValue={
                              styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ]?.styleButton
                            }
                            onChange={(e) => {
                              if (e.target.value === "Outline") {
                                handleChangeStyle({
                                  ...(styleSelectedType?.[
                                    `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                  ] ?? {}),
                                  ...{
                                    styleButton: "Outline",
                                    backgroundColor: "transparent",
                                    border: "1px solid",
                                  },
                                });
                              } else if (e.target.value === "Default") {
                                handleChangeStyle({
                                  ...(styleSelectedType?.[
                                    `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                  ] ?? {}),
                                  ...{
                                    styleButton: "Default",
                                    backgroundColor: "white",
                                    border: "none",
                                  },
                                });
                              } else {
                                handleChangeStyle({
                                  ...(styleSelectedType?.[
                                    `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                  ] ?? {}),
                                  ...{
                                    styleButton: "Simple",
                                    backgroundColor: "transparent",
                                    border: "none",
                                  },
                                });
                              }
                            }}
                            label="Style"
                          >
                            <MenuItem value="Default">Default</MenuItem>
                            <MenuItem value="Outline">Outline</MenuItem>
                            <MenuItem value="Simple">Simple</MenuItem>
                          </Select>
                        </FormControl>

                        <Typography sx={{ mt: 1 }}>Padding</Typography>
                        <Box display="flex" gap={1}>
                          <TextField
                            size="small"
                            label="Top"
                            margin="dense"
                            variant="outlined"
                            defaultValue={
                              styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ]?.paddingTop?.replace("px", "") ?? ""
                            }
                            onChange={(e) => {
                              handleChangeStyle({
                                ...(styleSelectedType?.[
                                  `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                ] ?? {}),
                                ...{ paddingTop: `${e.target.value}px` },
                              });
                            }}
                          />
                          <TextField
                            size="small"
                            label="Right"
                            margin="dense"
                            variant="outlined"
                            defaultValue={
                              styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ]?.paddingRight?.replace("px", "") ?? ""
                            }
                            onChange={(e) => {
                              handleChangeStyle({
                                ...(styleSelectedType?.[
                                  `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                ] ?? {}),
                                ...{ paddingRight: `${e.target.value}px` },
                              });
                            }}
                          />
                          <TextField
                            size="small"
                            label="Bottom"
                            margin="dense"
                            variant="outlined"
                            defaultValue={
                              styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ]?.paddingBottom?.replace("px", "") ?? ""
                            }
                            onChange={(e) => {
                              handleChangeStyle({
                                ...(styleSelectedType?.[
                                  `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                ] ?? {}),
                                ...{ paddingBottom: `${e.target.value}px` },
                              });
                            }}
                          />
                          <TextField
                            size="small"
                            label="Left"
                            margin="dense"
                            variant="outlined"
                            defaultValue={
                              styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ]?.paddingLeft?.replace("px", "") ?? ""
                            }
                            onChange={(e) => {
                              handleChangeStyle({
                                ...(styleSelectedType?.[
                                  `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                ] ?? {}),
                                ...{ paddingLeft: `${e.target.value}px` },
                              });
                            }}
                          />
                        </Box>

                        <TextField
                          fullWidth
                          size="small"
                          label="Radius"
                          margin="dense"
                          type="range"
                          variant="outlined"
                          defaultValue={
                            styleSelectedType?.[
                              `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                            ]?.borderRadius?.replace("px", "") ?? ""
                          }
                          onChange={(e) => {
                            handleChangeStyle({
                              ...(styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ] ?? {}),
                              ...{ borderRadius: `${e.target.value}px` },
                            });
                          }}
                        />

                        <FormControl size="small" margin="dense" fullWidth>
                          <InputLabel id="Expand">Expand</InputLabel>
                          <Select
                            labelId="Expand"
                            label="Expand"
                            defaultValue={
                              styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ]?.widthExpand ?? ""
                            }
                            onChange={(e) => {
                              handleChangeStyle({
                                ...(styleSelectedType?.[
                                  `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                ] ?? {}),
                                ...{
                                  widthExpand: true,
                                  width:
                                    e.target.value === true ? "100%" : "unset",
                                },
                              });
                            }}
                          >
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
                          onChange={(e) => {
                            handleChangeEvent({
                              ...(eventSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ] ?? {}),
                              ...{ link: e.target.value },
                            });
                          }}
                        />

                        <FormControl size="small" margin="dense" fullWidth>
                          <InputLabel id="Target">Target</InputLabel>
                          <Select
                            labelId="Target"
                            onChange={(e) => {
                              handleChangeEvent({
                                ...(eventSelectedType?.[
                                  `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                ] ?? {}),
                                ...{ target: e.target.value },
                              });
                            }}
                            label="Target"
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
                            defaultValue={
                              styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ]?.visibilityStatus ?? ""
                            }
                            onChange={(e) => {
                              if (e.target.value === true) {
                                handleChangeStyle({
                                  ...(styleSelectedType?.[
                                    `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                  ] ?? {}),
                                  ...{
                                    visibilityStatus: true,
                                    display: "block",
                                    visibility: "inherit",
                                  },
                                });
                              } else {
                                handleChangeStyle({
                                  ...(styleSelectedType?.[
                                    `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                  ] ?? {}),
                                  ...{
                                    visibilityStatus: false,
                                    display: "none",
                                    visibility: "hidden",
                                  },
                                });
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
                        <Grid item md={5}>
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
                        <Grid item md={5}>
                          <Button
                            sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                            fullWidth
                            disabled={selectedFormType === 0}
                            onClick={() => {
                              setOnFormType("options");

                              if (contentPosition === "left") {
                                setContentType2({
                                  left: "button",
                                  right: contentType2.right,
                                });
                              } else {
                                setContentType2({
                                  right: "button",
                                  left: contentType2.left,
                                });
                              }
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
                        defaultValue={
                          contentSelectedType?.[
                            `${selectedType}_text_${contentPosition}_${leftColumnSelected}`
                          ]?.content?.props?.children ?? ""
                        }
                        onChange={(e) => {
                          handleChangeContent(
                            <p
                              style={{
                                ...styleSelectedType?.[
                                  `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                ],
                                margin: 0,
                              }}
                            >
                              {e.target.value}
                            </p>
                          );
                        }}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        label="Font Size"
                        margin="dense"
                        type="range"
                        variant="outlined"
                        defaultValue={parseInt(
                          styleSelectedType?.[
                            `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                          ]?.fontSize?.replace("px", "") ?? 0
                        )}
                        onChange={(e) => {
                          handleChangeStyle({
                            ...(styleSelectedType?.[
                              `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                            ] ?? {}),
                            ...{ fontSize: `${e.target.value}px` },
                          });
                        }}
                      />
                      <FormControl size="small" margin="dense" fullWidth>
                        <InputLabel id="font_weight">Font Weight</InputLabel>
                        <Select
                          labelId="font_weight"
                          defaultValue={
                            styleSelectedType?.[
                              `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                            ]?.fontWeight ?? ""
                          }
                          onChange={(e) => {
                            handleChangeStyle({
                              ...(styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ] ?? {}),
                              ...{ fontWeight: e.target.value },
                            });
                          }}
                          label="Font Weight"
                        >
                          <MenuItem value="normal">Normal</MenuItem>
                          <MenuItem value="bold">Bold</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        fullWidth
                        size="small"
                        label="Line Height"
                        margin="dense"
                        type="range"
                        variant="outlined"
                        defaultValue={parseInt(
                          styleSelectedType?.[
                            `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                          ]?.lineHeight?.replace("px", "") ?? 0
                        )}
                        onChange={(e) => {
                          handleChangeStyle({
                            ...(styleSelectedType?.[
                              `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                            ] ?? {}),
                            ...{ lineHeight: `${e.target.value}px`, margin: 0 },
                          });
                        }}
                      />
                      <FormControl size="small" margin="dense" fullWidth>
                        <InputLabel id="text_align">Text Align</InputLabel>
                        <Select
                          labelId="text_align"
                          defaultValue={
                            styleSelectedType?.[
                              `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                            ]?.textAlign ?? ""
                          }
                          onChange={(e) => {
                            handleChangeStyle({
                              ...(styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ] ?? {}),
                              ...{ textAlign: e.target.value },
                            });
                          }}
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
                        defaultValue={
                          styleSelectedType?.[
                            `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                          ]?.color ?? ""
                        }
                        onChange={(e) => {
                          handleChangeStyle({
                            ...(styleSelectedType?.[
                              `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                            ] ?? {}),
                            ...{ color: e.target.value },
                          });
                        }}
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
                              handleChangeStyle({
                                ...(styleSelectedType?.[
                                  `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                ] ?? {}),
                                ...{
                                  display: "block",
                                  visibility: "inherit",
                                },
                              });
                            } else {
                              handleChangeStyle({
                                ...(styleSelectedType?.[
                                  `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                ] ?? {}),
                                ...{
                                  display: "none",
                                  visibility: "hidden",
                                },
                              });
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

                    <Grid
                      container
                      gap={1}
                      justifyContent="space-between"
                      px={1}
                    >
                      <Grid item md={5}>
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
                      <Grid item md={5}>
                        <Button
                          sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                          fullWidth
                          disabled={selectedFormType === 0}
                          onClick={() => {
                            setOnFormType("options");

                            if (contentPosition === "left") {
                              setContentType2({
                                left: "text",
                                right: contentType2.right,
                              });
                            } else {
                              setContentType2({
                                right: "text",
                                left: contentType2.left,
                              });
                            }
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
                          <input
                            style={{ display: "none" }}
                            onChange={(e) => {
                              handleUpload(e, "contentBackground").then(
                                (result) => {
                                  handleChangeContent(
                                    <img
                                      alt={"cover"}
                                      style={{
                                        width: "100%",
                                        display: "inline",
                                        borderRadius: "inherit",
                                        ...styleSelectedType?.[
                                          `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                        ],
                                      }}
                                      src={result?.data?.image?.url}
                                    />
                                  );
                                }
                              );
                            }}
                            type="file"
                          />
                        </Button>

                        <TextField
                          fullWidth
                          size="small"
                          label="Image from URL"
                          margin="dense"
                          defaultValue={
                            contentSelectedType?.[
                              `${selectedType}_image_${contentPosition}_${leftColumnSelected}`
                            ]?.content?.props?.src ?? ""
                          }
                          variant="outlined"
                          onChange={(e) => {
                            handleChangeContent(
                              <img
                                alt={"cover"}
                                style={{
                                  width: "100%",
                                  display: "inline",
                                  borderRadius: "inherit",
                                  ...styleSelectedType?.[
                                    `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                  ],
                                }}
                                src={e.target.value}
                              />
                            );
                          }}
                        />

                        <TextField
                          fullWidth
                          size="small"
                          label="Width"
                          margin="dense"
                          type="range"
                          variant="outlined"
                          defaultValue={parseInt(
                            styleSelectedType?.[
                              `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                            ]?.width?.replace("%", "") ?? 0
                          )}
                          onChange={(e) => {
                            handleChangeStyle({
                              ...(styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ] ?? {}),
                              ...{ width: `${e.target.value}%` },
                            });
                          }}
                        />

                        <Typography sx={{ mt: 1 }}>Margin</Typography>
                        <Box display="flex" gap={1}>
                          <TextField
                            size="small"
                            label="Top"
                            margin="dense"
                            variant="outlined"
                            defaultValue={parseInt(
                              styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ]?.marginTop?.replace("px", "") ?? 0
                            )}
                            onChange={(e) => {
                              handleChangeStyle({
                                ...(styleSelectedType?.[
                                  `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                ] ?? {}),
                                ...{ marginTop: `${e.target.value}px` },
                              });
                            }}
                          />
                          <TextField
                            size="small"
                            label="Right"
                            margin="dense"
                            variant="outlined"
                            defaultValue={parseInt(
                              styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ]?.marginRight?.replace("px", "") ?? 0
                            )}
                            onChange={(e) => {
                              handleChangeStyle({
                                ...(styleSelectedType?.[
                                  `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                ] ?? {}),
                                ...{ marginRight: `${e.target.value}px` },
                              });
                            }}
                          />
                          <TextField
                            size="small"
                            label="Bottom"
                            margin="dense"
                            variant="outlined"
                            defaultValue={parseInt(
                              styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ]?.marginBottom?.replace("px", "") ?? 0
                            )}
                            onChange={(e) => {
                              handleChangeStyle({
                                ...(styleSelectedType?.[
                                  `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                ] ?? {}),
                                ...{ marginBottom: `${e.target.value}px` },
                              });
                            }}
                          />
                          <TextField
                            size="small"
                            label="Left"
                            margin="dense"
                            variant="outlined"
                            defaultValue={parseInt(
                              styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ]?.marginLeft?.replace("px", "") ?? 0
                            )}
                            onChange={(e) => {
                              handleChangeStyle({
                                ...(styleSelectedType?.[
                                  `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                ] ?? {}),
                                ...{ marginLeft: `${e.target.value}px` },
                              });
                            }}
                          />
                        </Box>

                        <TextField
                          fullWidth
                          size="small"
                          label="Link"
                          margin="dense"
                          variant="outlined"
                          onChange={(e) => {
                            handleChangeEvent({
                              ...(eventSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ] ?? {}),
                              ...{ link: e.target.value },
                            });

                            handleChangeStyle({
                              ...(styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ] ?? {}),
                              ...{ cursor: `pointer` },
                            });
                          }}
                        />

                        <FormControl size="small" margin="dense" fullWidth>
                          <InputLabel id="Target">Target</InputLabel>
                          <Select
                            labelId="Target"
                            onChange={(e) => {
                              handleChangeEvent({
                                ...(eventSelectedType?.[
                                  `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                ] ?? {}),
                                ...{ target: e.target.value },
                              });
                            }}
                            label="Target"
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
                                handleChangeStyle({
                                  ...(styleSelectedType?.[
                                    `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                  ] ?? {}),
                                  ...{
                                    display: "block",
                                    visibility: "inherit",
                                  },
                                });
                              } else {
                                handleChangeStyle({
                                  ...(styleSelectedType?.[
                                    `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                  ] ?? {}),
                                  ...{
                                    display: "none",
                                    visibility: "hidden",
                                  },
                                });
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
                        <Grid item md={5}>
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
                        <Grid item md={5}>
                          <Button
                            sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                            fullWidth
                            disabled={selectedFormType === 0}
                            onClick={() => {
                              setOnFormType("options");

                              if (contentPosition === "left") {
                                setContentType2({
                                  left: "image",
                                  right: contentType2.right,
                                });
                              } else {
                                setContentType2({
                                  right: "image",
                                  left: contentType2.left,
                                });
                              }
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
                        value={textContent}
                        onChange={(e) =>
                          handleChangeTextContent(e.target.value)
                        }
                      />
                      <TextField
                        fullWidth
                        size="small"
                        label="Font Size"
                        margin="dense"
                        type="range"
                        variant="outlined"
                        defaultValue={
                          styleSelectedType?.[
                            `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                          ]?.fontSize ?? 0
                        }
                        onChange={(e) => {
                          handleChangeFontSize(e.target.value);
                          handleChangeStyle({
                            ...(styleSelectedType?.[
                              `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                            ] ?? {}),
                            ...{ fontSize: e.target.value },
                          });
                        }}
                      />
                      <FormControl size="small" margin="dense" fullWidth>
                        <InputLabel id="font_weight">Font Weight</InputLabel>
                        <Select
                          labelId="font_weight"
                          value={fontWeightValue}
                          defaultValue={
                            styleSelectedType?.[
                              `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                            ]?.fontWeight ?? ""
                          }
                          onChange={(e) => {
                            handleChangeFontWeight(e.target.value);

                            handleChangeStyle({
                              ...(styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ] ?? {}),
                              ...{ fontWeight: e.target.value },
                            });
                          }}
                          label="Font Weight"
                        >
                          <MenuItem value="normal">Normal</MenuItem>
                          <MenuItem value="bold">Bold</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        fullWidth
                        size="small"
                        label="Line Height"
                        margin="dense"
                        type="range"
                        variant="outlined"
                        defaultValue={
                          styleSelectedType?.[
                            `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                          ]?.lineHeight ?? 0
                        }
                        onChange={(e) => {
                          handleChangeLineHeight(e.target.value);
                          handleChangeStyle({
                            ...(styleSelectedType?.[
                              `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                            ] ?? {}),
                            ...{ lineHeight: e.target.value },
                          });
                        }}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        label="Text Color"
                        margin="dense"
                        type="color"
                        variant="outlined"
                        defaultValue={
                          styleSelectedType?.[
                            `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                          ]?.color ?? ""
                        }
                        onChange={(e) => {
                          handleChangeTextColor(e.target.value);
                          handleChangeStyle({
                            ...(styleSelectedType?.[
                              `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                            ] ?? {}),
                            ...{ color: e.target.value },
                          });
                        }}
                      />
                      <FormControl size="small" margin="dense" fullWidth>
                        <InputLabel id="Letter_case">Letter Case</InputLabel>
                        <Select
                          labelId="Letter_case"
                          value={letterCaseValue}
                          label="Letter Case"
                          defaultValue={
                            styleSelectedType?.[
                              `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                            ]?.textTransform ?? ""
                          }
                          onChange={(e) => {
                            handleChangeLetterCase(e.target.value);
                            handleChangeStyle({
                              ...(styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ] ?? {}),
                              ...{ textTransform: e.target.value },
                            });
                          }}
                        >
                          <MenuItem value="uppercase">Uppercase</MenuItem>
                          <MenuItem value="capitalize">Capitalize</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl size="small" margin="dense" fullWidth>
                        <InputLabel id="Style">Style</InputLabel>
                        <Select
                          labelId="Style"
                          value={styleValue}
                          label="Style"
                          defaultValue={
                            styleSelectedType?.[
                              `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                            ]?.textDecoration ?? ""
                          }
                          onChange={(e) => {
                            handleChangeStyleLink(e.target.value);
                            handleChangeStyle({
                              ...(styleSelectedType?.[
                                `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                              ] ?? {}),
                              ...{ textDecoration: e.target.value },
                            });
                          }}
                        >
                          <MenuItem value="none">Default</MenuItem>
                          <MenuItem value="underline">Underline</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        fullWidth
                        size="small"
                        label="Link"
                        margin="dense"
                        value={linkValue}
                        onChange={(e) => handleChangeLink(e.target.value)}
                      />
                      <FormControl size="small" margin="dense" fullWidth>
                        <InputLabel id="Target">Target</InputLabel>
                        <Select
                          labelId="Target"
                          value={targetValue}
                          onChange={(e) => handleChangeTarget(e.target.value)}
                          label="Target"
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
                              handleChangeStyle({
                                ...(styleSelectedType?.[
                                  `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                ] ?? {}),
                                ...{
                                  display: "block",
                                  visibility: "inherit",
                                },
                              });
                            } else {
                              handleChangeStyle({
                                ...(styleSelectedType?.[
                                  `${selectedType}_${contentType}_${contentPosition}_${leftColumnSelected}`
                                ] ?? {}),
                                ...{
                                  display: "none",
                                  visibility: "hidden",
                                },
                              });
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

                    <Grid container justifyContent="space-between" px={1}>
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
                            setOnFormType("options");

                            if (contentPosition === "left") {
                              setContentType2({
                                left: "link",
                                right: contentType2.right,
                              });
                            } else {
                              setContentType2({
                                right: "link",
                                left: contentType2.left,
                              });
                            }
                          }}
                        >
                          Apply
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                )}
            </div>

            <Box
              position="absolute"
              borderTop="1px solid #cacaca"
              width="95%"
              bottom={0}
              pt="10px"
              style={{ backgroundColor: "#ffffff" }}
            >
              <Button
                sx={{ backgroundColor: "#ff0016", color: "#fff", mr: 1, px: 3 }}
                onClick={() => handleSave()}
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
                Back
              </Button>
            </Box>
          </Grid>
        )}

        <Grid item xs={collapseFullscreen ? 11.5 : 9.5} position="relative">
          <Typography variant="h3" color="secondary">
            Add Card
          </Typography>
          <Box
            style={{
              background: "#555555",
              height: "80vh",
              marginTop: "30px",
              padding: "20px",
              overflowY: "auto",
            }}
          >
            {isInsert && selectedType === 1 && (
              <Box
                id="content_tipe_1"
                sx={{
                  backgroundColor: "rgb(193, 193, 193)",
                  border: "3px dashed #00a3d3",
                  borderRadius: "10px",
                }}
                style={{
                  minHeight: contentSelectedType?.[
                    `1_${contentType}_${contentPosition}_${leftColumnSelected}`
                  ]?.content
                    ? "0px"
                    : "50%",
                  // width: "100%",
                  padding: "20px",
                  gap: 2,
                  ...styleLayout,
                }}
              >
                {[...new Array(leftColumnLength)].map((item, key) => {
                  const next = 1 + key;
                  if (
                    !leftElementDeleteList.find(
                      (items) => items === `left_${next}`
                    )
                  ) {
                    return (
                      <Box
                        // id="leftKolom"
                        sx={{
                          border: "3px dashed #00a3d3",
                          borderRadius: "10px",
                          marginBottom: "10px",
                        }}
                        style={{
                          width: "100%",
                          minHeight:
                            contentSelectedType?.[
                              `1_button_${contentPosition}_${next}`
                            ]?.content ??
                            contentSelectedType?.[
                              `1_text_${contentPosition}_${next}`
                            ]?.content ??
                            contentSelectedType?.[
                              `1_image_${contentPosition}_${next}`
                            ]?.content ??
                            contentSelectedType?.[
                              `1_link_${contentPosition}_${next}`
                            ]?.content
                              ? "0px"
                              : "380px",
                        }}
                      >
                        {contentSelectedType?.[
                          `1_button_${contentPosition}_${next}`
                        ]?.content ??
                          contentSelectedType?.[
                            `1_text_${contentPosition}_${next}`
                          ]?.content ??
                          contentSelectedType?.[
                            `1_image_${contentPosition}_${next}`
                          ]?.content ??
                          contentSelectedType?.[
                            `1_link_${contentPosition}_${next}`
                          ]?.content}
                      </Box>
                    );
                  }
                })}
              </Box>
            )}

            {isInsert && selectedType === 2 && (
              <Box
                id="content_tipe_2"
                sx={{
                  backgroundColor: "rgb(193, 193, 193)",
                  border: "3px dashed #00a3d3",
                  borderRadius: "10px",
                }}
                // style={{
                //   minHeight: "50%",
                //   // width: "100%",
                //   padding: "20px",
                //   display: "flex",
                //   // alignItems: "center",
                //   gap: 2,
                //   ...styleLayout,
                // }}
                style={{
                  width: "100%",
                  overflow: "hidden",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  paddingTop: "1.25rem",
                  paddingBottom: "1.25rem",
                  gap: "20px",
                  ...styleLayout,
                }}
              >
                {/* Column Left */}
                <Box
                  id="leftKolom"
                  style={{
                    width: "100%",
                    maxWidth: "480px",
                    padding: "20px 20px",
                    overflow: "hidden",
                  }}
                >
                  {[...new Array(leftColumnLength)].map((item, key) => {
                    const next = 1 + key;

                    if (
                      !leftElementDeleteList.find(
                        (items) => items === `left_${next}`
                      )
                    ) {
                      return (
                        <Box
                          sx={{
                            border: "3px dashed #00a3d3",
                            borderRadius: "10px",
                          }}
                          style={{
                            // width: "100%",
                            minHeight:
                              contentSelectedType?.[`2_button_left_${next}`]
                                ?.content ??
                              contentSelectedType?.[`2_text_left_${next}`]
                                ?.content ??
                              contentSelectedType?.[`2_image_left_${next}`]
                                ?.content ??
                              contentSelectedType?.[`2_link_left_${next}`]
                                ?.content ??
                              contentSelectedType?.[
                                `2_${contentType2?.left}_left_${next}`
                              ]?.content
                                ? "0px"
                                : "380px",
                          }}
                        >
                          {contentSelectedType?.[`2_button_left_${next}`]
                            ?.content ??
                            contentSelectedType?.[`2_text_left_${next}`]
                              ?.content ??
                            contentSelectedType?.[`2_image_left_${next}`]
                              ?.content ??
                            contentSelectedType?.[`2_link_left_${next}`]
                              ?.content ??
                            contentSelectedType?.[
                              `2_${contentType2?.left}_left_${next}`
                            ]?.content}
                        </Box>
                      );
                    }
                  })}
                </Box>
                {/* Column Right */}
                <Box
                  style={{
                    width: "100%",
                    maxWidth: "480px",
                    marginBottom: "20px",
                    padding: "20px 20px",
                    overflow: "hidden",
                  }}
                  id="rightKolom"
                >
                  {[...new Array(rightColumnLength)].map((item, key) => {
                    const next = 1 + key;

                    if (
                      !leftElementDeleteList.find(
                        (items) => items === `right_${next}`
                      )
                    ) {
                      return (
                        <Box
                          sx={{
                            border: "3px dashed #00a3d3",
                            borderRadius: "10px",
                          }}
                          style={{
                            // width: "50%",
                            minHeight:
                              contentSelectedType?.[`2_button_right_${next}`]
                                ?.content ??
                              contentSelectedType?.[`2_text_right_${next}`]
                                ?.content ??
                              contentSelectedType?.[`2_image_right_${next}`]
                                ?.content ??
                              contentSelectedType?.[`2_link_right_${next}`]
                                ?.content ??
                              contentSelectedType?.[
                                `2_${contentType2?.right}_right_${next}`
                              ]?.content
                                ? "0px"
                                : "380px",
                          }}
                        >
                          {contentSelectedType?.[`2_button_right_${next}`]
                            ?.content ??
                            contentSelectedType?.[`2_text_right_${next}`]
                              ?.content ??
                            contentSelectedType?.[`2_image_right_${next}`]
                              ?.content ??
                            contentSelectedType?.[`2_link_right_${next}`]
                              ?.content ??
                            contentSelectedType?.[
                              `2_${contentType2?.right}_right_${next}`
                            ]?.content}
                        </Box>
                      );
                    }
                  })}
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
