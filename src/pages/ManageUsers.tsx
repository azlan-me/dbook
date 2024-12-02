import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { UserPlus, EyeOff, Eye, ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  status: "Active" | "Inactive";
}

const dummyUsers: User[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john@example.com",
    status: "Active",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    username: "janesmith",
    email: "jane@example.com",
    status: "Inactive",
  },
  // Add more dummy users for pagination testing
  ...Array.from({ length: 18 }, (_, i) => ({
    id: `${i + 3}`,
    firstName: `User${i + 3}`,
    lastName: `LastName${i + 3}`,
    username: `user${i + 3}`,
    email: `user${i + 3}@example.com`,
    status: i % 2 === 0 ? "Active" : "Inactive" as "Active" | "Inactive",
  })),
];

export default function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "asc" | "desc";
  } | null>(null);
  
  const navigate = useNavigate();

  const handleSort = (key: keyof User) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === "asc" ? "desc" : "asc"
    }));
  };

  const sortedUsers = [...dummyUsers].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredUsers = sortedUsers.filter((user) => {
    const searchString = searchTerm.toLowerCase();
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchString) ||
      user.lastName.toLowerCase().includes(searchString) ||
      user.username.toLowerCase().includes(searchString) ||
      user.email.toLowerCase().includes(searchString) ||
      user.status.toLowerCase().includes(searchString);
    
    return matchesSearch && (showInactive || user.status === "Active");
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * parseInt(rowsPerPage),
    currentPage * parseInt(rowsPerPage)
  );

  const totalPages = Math.ceil(filteredUsers.length / parseInt(rowsPerPage));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="p-4 sm:p-8 lg:pl-72">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Manage Users</h1>
          <Button 
            onClick={() => navigate("/manage-users/create")} 
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            New User
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              placeholder="Search by name, email, username or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-8"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-auto py-1 px-2"
                onClick={() => setSearchTerm("")}
              >
                ×
              </Button>
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => setShowInactive(!showInactive)}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            {showInactive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showInactive ? "Hide Inactive" : "Show Inactive"}
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {(["lastName", "firstName", "username", "email", "status"] as const).map((key) => (
                  <TableHead key={key} className="cursor-pointer" onClick={() => handleSort(key)}>
                    <div className="flex items-center gap-2">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow 
                  key={user.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/manage-users/edit/${user.id}`)}
                >
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "Active" ? "default" : "secondary"}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <Select
              value={rowsPerPage}
              onValueChange={(value) => {
                setRowsPerPage(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["5", "10", "20", "50"].map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}