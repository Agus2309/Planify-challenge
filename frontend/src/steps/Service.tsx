import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Card, CardContent, Button, LinearProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';
import { API_URL } from '../App';


interface ServiceProps {
  onSelectService: (service: any) => void;
}

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

const Service: React.FC<ServiceProps> = ({ onSelectService }) => {
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [expanded, setExpanded] = useState<string>('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/services`);
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

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    onSelectService(service);
    localStorage.setItem('selectedService', JSON.stringify(service));
};

  return (
    <>
    <div className='mb-24'>
      <div className='mxxs:max-w-xs mx-auto mt-3'>
          <p className='text-left text-lg font-bold'>Seleccionar Servicio</p>
          <LinearProgress
          color='success'
          variant='determinate'
          value={33}
          sx={{ height: '15px' }}
        />
      </div>
      <section className="mt-5">
        <div className="max-w-xs mx-auto">
          <Card className='border border-gray-400' sx={{borderRadius: '0px'}}>
            <CardContent>
              <p className='font-semibold text-xl mt-1 mb-2'>Categorías</p>
              {categories.map((categoryGroup: CategoryGroup, index) => (
                <Accordion
                  key={index}
                  expanded={expanded === categoryGroup.category}
                  onChange={() => handleChange(categoryGroup.category)}
                  sx={{ backgroundColor: '', marginBottom: '6px', padding: '0%', borderRadius: '0px' }}
                  className='border border-gray-400'
                >
                  <AccordionSummary expandIcon={expanded === categoryGroup.category ? <RemoveIcon /> : <AddIcon />}>
                    <p className='text-lg font-medium'>{categoryGroup.category}</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    {categoryGroup.services.map((service: Service) => (
                      <Card className='border border-gray-400 mt-2' sx={{borderRadius: '0px'}} key={service.id}>
                        <CardContent>
                          <p className='text-lg font-medium'>{service.name}</p>
                          <p>{service.description}</p>
                          <Button
                            variant='contained'
                            size='small'
                            onClick={() => handleServiceSelect(service)}
                            sx={{ marginLeft: '45%', marginTop: '5px', backgroundColor: 'gray' }}
                          >
                            Seleccionar
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        </div>
        {selectedService && (
          <div className='mt-20 w-full bottom-0'>
            <Card className='border border-gray-400' sx={{borderRadius: '0px'}}>
              <CardContent className='flex justify-end'>
                <Link to={'/schedule'}>
                  <Button variant='contained' className='bg-gray-700' sx={{backgroundColor: 'rgb(55 65 81)', borderRadius: '0%'}}>Siguiente</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </div>
    </>
  );
};

export default Service;
