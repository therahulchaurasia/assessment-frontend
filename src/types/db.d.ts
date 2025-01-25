export type User = {
  _id: string
  email: string
  name: string
  createdAt: string
  updatedAt: string
}

export type Task = {
  _id: string
  name: string
  description: string
  status: string
  createdBy: string
  createdAt: string
  updatedAt: string
}
