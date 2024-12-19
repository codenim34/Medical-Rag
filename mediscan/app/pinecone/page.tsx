"use client"
import React,{ useState} from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Database, LucideLoader2, MoveUp, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'

type Props = {}

const VectorDBpage = (props: Props) => {
    const [isUploading, setIsUploading] =useState(false)
    const [indexName, setIndexName] = useState('')
    const [namespace, setNamespace] = useState('')
    const onStartUpload = async() => {
          const response= await fetch('/api/updatedatabase', {
            method: 'POST',
            body: JSON.stringify({
              indexName,
              namespace
            })
          })
          console.log(response);
    }
    return (
        <main className='flex flex-col items-center p-24'>
            <Card>
                <CardHeader>
                    <CardTitle>Update Knowledge Base</CardTitle>
                    <CardDescription>Add new Documents to your vector DB</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='col-span-2 grid gap-4 border rounder-lg p-6'>
                            <div className='gap-4 relative'>
                                <Button className='absolute -right-4 -top-4' variant={'ghost'} size={'icon'}>
                                    <RefreshCcw />
                                </Button>
                                <Label>Files List</Label>
                                <Textarea readOnly className='min-h-24 resize-none border p-3 shadow-none disabled:cursor-default focus-visible:ring-0 text-sm text-muted-foreground' />


                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='grid gap-2'>
                                    <Label>Index Name</Label>
                                    <input value={indexName} onChange={(e) => setIndexName(e.target.value)} placeholder='index name' className='border rounded-md disabled:cursor-default' disabled={isUploading}/>

                                </div>
                                <div className='grid gap-2'>
                                    <Label>Namespace</Label>
                                    <input value={namespace} onChange={(e) => setNamespace(e.target.value)} placeholder='namespace' className='border rounded-md disabled:cursor-default' disabled={isUploading}/>
                                </div>
                            </div>


                        </div>
                        <Button onClick={onStartUpload} variant={'outline'} className='w-full h-full' disabled={isUploading}>
                           <span className='flex flex-row'>
                           <Database  className='stroke-[#D90013] size-50'/>
                           <MoveUp className='stroke-[#D90013]'/>
                           </span>
                          

                        </Button>

                    </div>
                    {isUploading && <div className='mt-4'>
                        <Label>File Name</Label>
                        <div className='flex flex-row items-center gap-4'>
                          <Progress value={80}/>
                          <LucideLoader2 className='stroke-[#D90013] animate-spin'/>
                        </div>

                    </div> }
                </CardContent>
                <CardFooter>
                    <p>Vector DB</p>
                </CardFooter>
            </Card>
        </main>
    )
}

export default VectorDBpage
