import { Router  } from 'express';
import { deletePersona, getPersonas,getPersona, postPersona, updatePersona } from '../controllers/persona';

const router = Router();

router.get('/', getPersonas);
router.get('/:rut', getPersona)
router.delete('/:rut', deletePersona)
router.post('/', postPersona)
router.put('/:rut', updatePersona)
export default router;