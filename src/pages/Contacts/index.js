import { ToggleDataViewMode } from './ToggleDataViewMode';
import { ContactsTable } from './ContactsTable';
import { useContacts } from './useContacts';
import { DATA_VIEW_MODES } from './constants';
import { useDataViewMode } from './useDataViewMode';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			marginTop: theme.spacing(4),
		},
		headContainer: {
			marginBottom: theme.spacing(3),
		},
	})
);

export const Contacts = () => {
	const classes = useStyles();
	const contacts = useContacts();
	const [dataViewMode, setDataViewMode] = useDataViewMode();

	return (
		<Container className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12} className={classes.headContainer}>
					<Box display='flex' justifyContent='space-between'>
						<Typography variant='h4' component='h1'>
							Contacts
						</Typography>
						<ToggleDataViewMode
							dataViewMode={dataViewMode}
							setDataViewMode={setDataViewMode}
						/>
					</Box>
				</Grid>
				<Grid item xs={12}>
					{(() => {
						if (contacts.isLoading) {
							return <CircularProgress />;
						}

						if (contacts.isError) {
							return <div>Error...</div>;
						}

						if (dataViewMode === DATA_VIEW_MODES.TABLE) {
							return <ContactsTable data={contacts.data} />;
						}

						if (dataViewMode === DATA_VIEW_MODES.GRID) {
							return 'grid';
						}

						return null;
					})()}
				</Grid>
			</Grid>
		</Container>
	);
};
