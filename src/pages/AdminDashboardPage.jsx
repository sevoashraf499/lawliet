import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

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

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
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

    fetchTestimonials();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const createTestimonial = async (newTestimonial) => {
    await fetch(
      "https://66a5336c5dc27a3c190aea7c.mockapi.io/api/testimonials",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newTestimonial, isNew: false }),
      }
    );
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
  };

  const deleteTestimonial = async (id) => {
    await fetch(
      `https://66a5336c5dc27a3c190aea7c.mockapi.io/api/testimonials/${id}`,
      {
        method: "DELETE",
      }
    );
    setRows((oldRows) => oldRows.filter((row) => row.id !== id));
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    deleteTestimonial(id);
  };

  const handleCancelClick = (id) => () => {
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
        createdAt: new Date(originalRow.createdAt),
        isNew: false,
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
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 100,
    //   type: "dateTime",
    //   align: "left",
    //   headerAlign: "left",
    //   editable: true,
    // },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      align: "left",
      headerAlign: "left",
      //   type: "dateTime",
      type: "string",
      editable: false,
      //   valueGetter: (params) => new Date(params.value), // Transform value to Date object
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
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ]
          : [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
              />,
            ];
      },
    },
  ];

  return (
    <Box
      sx={{
        // height: "auto",
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
            // createTestimonial,
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
    </Box>
  );
};

export default AdminDashboardPage;
