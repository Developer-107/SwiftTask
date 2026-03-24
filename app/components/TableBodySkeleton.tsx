import { Table } from '@radix-ui/themes'
import Skeleton from './Skeleton'

export default function TableBodySkeleton() {
  return (
    <Table.Body>
        {[...Array(10)].map((_, i) => (
        <Table.Row key={i}>
        <Table.RowHeaderCell> <Skeleton /></Table.RowHeaderCell>
        <Table.Cell><Skeleton /></Table.Cell>
        <Table.Cell><Skeleton /></Table.Cell>
        <Table.Cell><Skeleton /></Table.Cell>
        <Table.Cell><Skeleton /></Table.Cell>
        </Table.Row>))}
      </Table.Body>
  )
}
