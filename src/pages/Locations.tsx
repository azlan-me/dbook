import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Location {
  id: number;
  name: string;
  address: string;
  state: string;
  postalCode: string;
}

const mockLocations: Location[] = [
  {
    id: 1,
    name: "Main Clinic - Downtown",
    address: "123 Main St, Downtown",
    state: "CA",
    postalCode: "90210",
  },
  {
    id: 2,
    name: "North Branch - Uptown",
    address: "456 North Ave, Uptown",
    state: "CA",
    postalCode: "90211",
  },
  {
    id: 3,
    name: "South Branch - Riverside",
    address: "789 South Rd, Riverside",
    state: "CA",
    postalCode: "90212",
  },
];

const Locations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLocations = mockLocations.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <div className="p-8">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold">Locations</h1>
              <p className="text-muted-foreground">
                Manage all clinic locations and their details
              </p>
            </div>

            <div className="flex justify-between items-center gap-4">
              <Input
                placeholder="Search locations..."
                className="max-w-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={() => navigate("/locations/add")}>
                <Plus className="mr-2 h-4 w-4" />
                Add Location
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SR#</TableHead>
                    <TableHead>Location Name</TableHead>
                    <TableHead>ADDRESS</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>POSTAL CODE</TableHead>
                    <TableHead>ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLocations.map((location) => (
                    <TableRow key={location.id}>
                      <TableCell>{location.id}</TableCell>
                      <TableCell>{location.name}</TableCell>
                      <TableCell>{location.address}</TableCell>
                      <TableCell>{location.state}</TableCell>
                      <TableCell>{location.postalCode}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/locations/${location.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/locations/edit/${location.id}`)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;