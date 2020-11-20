import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Box, 
    Dialog,
    Link,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Typography 
} from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    item: {
        backgroundColor: '#F5F7F9',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#E1EAF1',
        }
    },
    selected: {
        backgroundColor: '#f48fb1',
        color: '#fff'
    },
    header: {
        color: '#fff',
        backgroundColor: '#4663A3',
        marginLeft: theme.spacing(-1),
        marginTop: theme.spacing(-1)
    },
    dialog: {
        width: '500px',
    },
    noBorder: {
        border: 'none',
    }
  }));

function App() {
  const [projects, updateProjects] = useState();
  const [selected, updateSelected] = useState({});
  const [showDialog, updateShowDialog] = useState(false);
  const classes = useStyles(); 
  const apiUrl = 'http://localhost:5000';

  const getAllProducts = () => {
    fetch(`${apiUrl}/api/projects/all`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        updateProjects(data);
    });
  }

  useEffect(() => {
    getAllProducts();
  }, []);
  
  const handleClose = () => {
    updateShowDialog(false);
    updateSelected({});
  };
  
  const setProject = (item) => {
    updateSelected(item);
    updateShowDialog(true);
  };

  const header = (
    <Box width="100%"
    p={2}
    textAlign="left"
    height={24}
    className={classes.header}>
      <Box>
      <Typography variant="h6">
        VICTR / Py Projects
      </Typography>
      </Box>
    </Box>
  );

  const showProjectDialog = selected && showDialog && (
    <Dialog onClose={handleClose} open maxWidth="md">
      <Box maxWidth={{ xs: '90%', md: '500px'}} 
        pt={2}
        pb={3} 
        px={4} 
        display="flex" 
        flexDirection="column"
        alignItems="end">
        <Table>
        <TableBody>
        <TableRow>
            <TableCell scope="row">
            <Typography
            color="textPrimary"
            variant="body1">
                Project detail:
            </Typography>
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell scope="row">
                <Typography
                    color="textSecondary"
                    variant="body2"
                    component="span"
                >
                    {selected.name}
                </Typography>
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell scope="row">
                <Typography
                    color="textSecondary"
                    variant="body2"
                    component="span"
                >
                    <Link href="#" onClick={() => window.open(selected.url, '_blank')}>
                        {selected.url}
                    </Link>
                </Typography>
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell scope="row">
                <Typography
                    color="textSecondary"
                    variant="body2"
                    component="span"
                >
                    {selected.description}
                </Typography>
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell scope="row">
                <Typography
                    color="textSecondary"
                    variant="body2"
                    component="span"
                >
                    Stars: {selected.num_stars}
                </Typography>
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell scope="row">
                <Typography
                    color="textSecondary"
                    variant="body2"
                    component="span"
                >
                    Created: {moment(selected.created_date).format('MMMM Do, YYYY')}
                </Typography>
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell scope="row" classes={{ root: classes.noBorder }}>
                <Typography
                    color="textSecondary"
                    variant="body2"
                    component="span"
                >
                    Last push: {moment(selected.last_push_date).format('MMMM Do, YYYY')}
                </Typography>
            </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </Box>
    </Dialog>
  );

  const projectsList = projects && (
    <Box 
        maxWidth={800}
        mx="auto"
        p={2}
        >
      <Box>
      </Box>
      {projects
        && projects.map(project => (
        <Box 
            key={project.name}
            display="flex"
            justifyContent="space-between"
            width="100%"
            p={1}
            mb={1}
            border="1px solid #E1EAF1"
            className={selected && selected.id === project.id ? classes.selected : classes.item}
            onClick={() => setProject(project)}>
                <Typography variant="body2">
                    {project.name}
                </Typography>
                <Typography variant="body2">
                    stars: {project.num_stars}
                </Typography>
        </Box>
        ))}
    </Box>
  ); 

  return (
    <>
    {showProjectDialog}
    <div className="App">
        {header}
        {projectsList}
    </div>
    </>
  );
}

export default App;
