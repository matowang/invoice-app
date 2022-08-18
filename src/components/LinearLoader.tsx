import LinearProgress from '@mui/material/LinearProgress';

type LinearLoadingProps = {
    loading: boolean
}

const LinearLoader = ({ loading }: LinearLoadingProps) => {

    if (!loading)
        return <></>

    return (
        <LinearProgress
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1200
            }} />
    )
}

export default LinearLoader;