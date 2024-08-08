import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// mui components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// mui icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

// mui grid
import {
  GridToolbar,
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

import NavBar from "./../components/NavBar";

const EditToolbar = ({ setRows, setRowModesModel }) => {
  const handleClick = () => {
    const id = `${Date.now()}-${Math.random()}`;

    const newTestimonial = {
      id,
      createdAt: new Date(),
      title: "",
      description: "",
      image: "",
      name: "",
      position: "",
      isNew: true,
    };

    setRows((oldRows) => [...oldRows, newTestimonial]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "title" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Testimonial
      </Button>
    </GridToolbarContainer>
  );
};

const CustomToolbar = (props) => (
  <GridToolbarContainer
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <EditToolbar {...props} />
    <Box sx={{ marginLeft: "auto" }}>
      <GridToolbar {...props} />
    </Box>
  </GridToolbarContainer>
);

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const [isDeleteConfirmationPopupOpened, setIsDeleteConfirmationPopupOpened] =
    useState(false);
  const [selectedDeleteID, setSelectedDeleteID] = useState(null);

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const fetchTestimonials = async () => {
    const response = await fetch(
      "https://66a5336c5dc27a3c190aea7c.mockapi.io/api/testimonials"
    );
    const data = await response.json();

    if (data && data !== "Not found") {
      const fetchedRows = data.map((item) => ({
        id: item.id,
        createdAt: new Date(item.createdAt),
        title: item.title,
        description: item.description,
        image: item.image,
        name: item.name,
        position: item.position,
      }));
      setRows(fetchedRows);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const createTestimonial = async (newTestimonial) => {
    const { id, isNew, ...rest } = newTestimonial;

    await fetch(
      "https://66a5336c5dc27a3c190aea7c.mockapi.io/api/testimonials",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
      }
    );

    fetchTestimonials();
  };

  const updateTestimonial = async (id, updatedTestimonial) => {
    const response = await fetch(
      `https://66a5336c5dc27a3c190aea7c.mockapi.io/api/testimonials/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTestimonial),
      }
    );
    const updatedRow = await response.json();

    setRows((oldRows) =>
      oldRows.map((row) => (row.id === id ? updatedRow : row))
    );

    fetchTestimonials();
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = async (id) => {
    await fetch(
      `https://66a5336c5dc27a3c190aea7c.mockapi.io/api/testimonials/${id}`,
      {
        method: "DELETE",
      }
    );
    setRows((oldRows) => oldRows.filter((row) => row.id !== id));

    fetchTestimonials();
  };

  const handleCancelClick = (id) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows((oldRows) => oldRows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    const originalRow = rows.find((row) => row.id === newRow.id);

    if (!originalRow.isNew) {
      const updatedRow = {
        ...newRow,
        createdAt: new Date(),
      };

      await updateTestimonial(newRow.id, updatedRow);
      return updatedRow;
    } else {
      await createTestimonial(newRow);
      return newRow;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      type: "number",
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      align: "left",
      headerAlign: "left",
      type: "dateTime",
      // type: "string",
      editable: false,
    },
    {
      field: "title",
      headerName: "Title",
      width: 180,
      align: "left",
      headerAlign: "left",
      type: "string",
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 180,
      align: "left",
      headerAlign: "left",
      type: "string",
      editable: true,
    },
    {
      field: "image",
      headerName: "Image",
      width: 120,
      align: "left",
      headerAlign: "left",
      type: "string",
      editable: true,
      renderCell: (params) => (
        <Avatar src={params.value} alt="testimonial writer" />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 220,
      align: "left",
      headerAlign: "left",
      type: "string",
      editable: true,
    },
    {
      field: "position",
      headerName: "Position",
      width: 220,
      align: "left",
      headerAlign: "left",
      type: "string",
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        return isInEditMode
          ? [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{ color: "primary.main" }}
                onClick={() => handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={() => handleCancelClick(id)}
                color="inherit"
              />,
            ]
          : [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={() => handleEditClick(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => {
                  setIsDeleteConfirmationPopupOpened(true);
                  setSelectedDeleteID(id);
                }}
                color="inherit"
              />,
            ];
      },
    },
  ];

  return (
    <>
      <NavBar />

      <Container
        maxWidth={false}
        sx={{
          padding: 0,
          height: "30rem",
          width: "100%",
          "& .actions": {
            color: "text.secondary",
            cursor: 'url("/assets/pointer.png"), default !important;', // Custom cursor for actions
          },
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            cursor: 'url("/assets/pointer.png"), default !important;',
          },
          "& .textPrimary": {
            color: "text.primary",
          },
          "& button": {
            cursor: 'url("/assets/pointer.png"), default !important;',
          },
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{ textAlign: "center", marginBlock: 3 }}
        >
          Admin Dashboard 🤵
        </Typography>

        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          getRowId={(row) => row.id}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: CustomToolbar,
          }}
          slotProps={{
            toolbar: {
              setRows,
              setRowModesModel,
              showQuickFilter: true,
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "center", marginBlock: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{
              "&:hover": {
                backgroundColor: "primary.dark",
                transform: "scale(1.05)",
                transition: "transform 0.5s",
              },
            }}
          >
            Go to Home Page
          </Button>
        </Box>
      </Container>

      <Dialog
        open={isDeleteConfirmationPopupOpened}
        onClose={handleCancelClick}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this testimonial?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsDeleteConfirmationPopupOpened(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteClick(selectedDeleteID);
              setIsDeleteConfirmationPopupOpened(false);
            }}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminDashboardPage;
