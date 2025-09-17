import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, MapPin, Upload, X } from "lucide-react";

interface ReportIssueFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

const categories = [
  "Road Maintenance",
  "Garbage Collection",
  "Street Lighting",
  "Water Issues",
  "Park Maintenance",
  "Traffic Signs",
  "Other"
];

export default function ReportIssueForm({ onSubmit, onCancel }: ReportIssueFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: ""
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    console.log(`${field} changed to:`, value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages(prev => [...prev, ...files]);
    console.log('Images selected:', files.length);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    console.log('Image removed at index:', index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData, 'Images:', selectedImages.length);
    onSubmit?.({ ...formData, images: selectedImages });
  };

  const getCurrentLocation = () => {
    console.log('Getting current location...');
    setFormData(prev => ({
      ...prev,
      location: "Current Location (GPS)"
    }));
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Report an Issue
          {onCancel && (
            <Button size="icon" variant="ghost" onClick={onCancel} data-testid="button-close-form">
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Issue Title*</Label>
            <Input
              id="title"
              placeholder="Brief description of the issue"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
              data-testid="input-issue-title"
            />
          </div>

          <div>
            <Label htmlFor="category">Category*</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger data-testid="select-category">
                <SelectValue placeholder="Select issue category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description*</Label>
            <Textarea
              id="description"
              placeholder="Provide detailed information about the issue"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              required
              data-testid="textarea-description"
            />
          </div>

          <div>
            <Label htmlFor="location">Location*</Label>
            <div className="flex gap-2">
              <Input
                id="location"
                placeholder="Enter location or address"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
                data-testid="input-location"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={getCurrentLocation}
                data-testid="button-gps-location"
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label>Photos (Optional)</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  asChild
                  data-testid="button-upload-photo"
                >
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  asChild
                  data-testid="button-upload-file"
                >
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </Button>
              </div>
              
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-muted rounded border overflow-hidden">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                        data-testid={`button-remove-image-${index}`}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1" data-testid="button-submit-report">
              Submit Report
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel-report">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}