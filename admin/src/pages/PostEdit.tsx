import {Button, Input, Select} from "antd";
import {useEffect, useState} from "react";
import http from "@/http/http";
import {useNavigate, useSearchParams} from "react-router-dom";

function PostEdit() {
    const [tags, setTags] = useState<any[]>([])
    const [dataTags, setDataTags] = useState<string[]>([])
    const [form, setForm] = useState({
        title: '',
        content: '',
        tagIds: [] as number[],
    })
    
    const [params] = useSearchParams()
    const id = params.get('id')
    
    const fetchData = async () => {


        if (!id) return;
        const res: any = await http.get(`post/${id}`)
        setDataTags(res.tagIds.map((tagId: number) => `${tagId}`))
        setForm({
            ...form,
            title: res.title,
            content: res.content,
        })
    }

    
    const onSelectChange = (e: string[]) => {
        setForm({
            ...form,
            tagIds: e.map(item => Number(item))
        })
        setDataTags(e)
    }
    const fetchTags = async () => {
        const res = await  http.get<Array<any>>('tag')
        setTags(res)
    }
    
    useEffect(() => {
        fetchTags()
        fetchData()
    }, [])

    const navigate = useNavigate()
    const onSubmit = async () => {
        if (id) {
            await http.put(`post/${id}`, form);
        } else {
            await http.post('post', form)
        }
        
        navigate('/post')
    }
    
    return (
        <div>
            <Input
                placeholder={'标题'}
                style={{marginBottom: '20px'}}
                value={form.title}
                onChange={(e) => {
                    setForm({
                        ...form,
                        title: e.target.value
                    })
                }}
            />
            <Input.TextArea
                value={form.content}
                placeholder={'内容'}
                onChange={(e) => {
                    setForm({
                        ...form,
                        content: e.target.value
                    })
                }}
                autoSize={
                    {
                        minRows: 10
                    }
                } 
                style={{marginBottom: '20px'}}
            />
            <Select
                value={dataTags}
                mode="multiple" style={{ width: '100%' }} onChange={onSelectChange}>
                {
                    tags.map((tag) => (
                        <Select.Option
                            key={`tag-${tag.id}`}
                            value={`${tag.id}`}
                        >{tag.name}</Select.Option>
                    ))
                }
            </Select>
            <Button type={'primary'} onClick={onSubmit}>保存</Button>
        </div>
    )
}

export default PostEdit