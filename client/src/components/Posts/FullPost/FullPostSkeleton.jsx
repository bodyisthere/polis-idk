import { Skeleton } from 'react-skeleton-generator';

function FullPostSkeleton() {
    return (
        <Skeleton.SkeletonThemeProvider animation='opacity'>
            {/* <Skeleton width='120%'/> */}
            {/* <Skeleton width="50px" height="50px" borderRadius="50%" />  */}
            {/* <Skeleton count={3} widthMultiple={['100%', '50%', '75%']} heightMultiple={['50px', '20px', '15px']} />  */}
        </Skeleton.SkeletonThemeProvider>
    )
}

export default FullPostSkeleton;