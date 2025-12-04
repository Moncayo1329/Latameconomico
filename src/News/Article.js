import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function Article(){
const { category, file } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/posts/${category}/${file}`)
      .then(res => res.text())
      .then(text => setContent(text));
  }, [category, file]);
  
    return(
<div style={{margin:"30px"}}>
<ReactMarkdown>{content}</ReactMarkdown>
</div>

    )
}


export default Article;