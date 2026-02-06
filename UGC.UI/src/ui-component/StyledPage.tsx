import { Container } from "@mui/material"
import type { SxProps, Theme } from "@mui/material/styles"
import type { ReactNode } from "react"

type StyledPageProps = {
    children: ReactNode
    sx?: SxProps<Theme>
}

export const StyledPage = ({ children, sx }: StyledPageProps) => {
    return (
        <Container maxWidth="xl" sx={[{ py: 4 }, ...(sx ? (Array.isArray(sx) ? sx : [sx]) : [])]}>
            {children}
        </Container>
    )
}

export default StyledPage