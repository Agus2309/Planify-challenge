import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
}

interface CategoryGroup {
  category: string;
  services: Service[];
}

const Service: React.FC = () => {
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [expanded, setExpanded] = useState<string>('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/services');
      const data = await response.json();
      const groupedCategories = groupServicesByCategory(data.services);
      setCategories(groupedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const groupServicesByCategory = (services: Service[]): CategoryGroup[] => {
    const categoriesMap = new Map<string, Service[]>();
    services.forEach((service) => {
      const { category } = service;
      if (!categoriesMap.has(category)) {
        categoriesMap.set(category, []);
      }
      categoriesMap.get(category)?.push(service);
    });
    return Array.from(categoriesMap).map(([category, services]) => ({ category, services }));
  };

  const handleChange = (category: string) => {
    setExpanded(category === expanded ? '' : category);
  };

  return (
    <section className="mt-5">
      <div className="max-w-xs mx-auto">
        <Card>
          <CardContent>
            <p className='font-semibold text-xl mt-1 mb-2'>Categorías</p>
            {categories.map((categoryGroup: CategoryGroup, index) => (
              <Accordion
                key={index}
                expanded={expanded === categoryGroup.category}
                onChange={() => handleChange(categoryGroup.category)}
                sx={{ backgroundColor: 'lightgray', marginBottom: '5px' }}
              >
                <AccordionSummary expandIcon={expanded === categoryGroup.category ? <RemoveIcon /> : <AddIcon />}>
                  <Typography>{categoryGroup.category}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {categoryGroup.services.map((service: Service) => (
                    <Typography key={service.id}>{service.name}</Typography>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Service;
