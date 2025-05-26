import { useEffect, useState } from "react"
import { useContentStore } from "../store/content"
import axios from "axios"

const useFetchTrending = () => {
    const [ trendingContent, setTrendingContent ] = useState(null)
    const { contentType } = useContentStore()

    useEffect(() => {
        const getFetchTrending = async () => {
            const res = await axios.get(`/api/v1/${contentType}/trending`)
            setTrendingContent(res.data.content)
        }

        getFetchTrending()
    }, [contentType])
    return {trendingContent}
}

export default useFetchTrending
