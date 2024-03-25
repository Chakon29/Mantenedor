import { Router  } from 'express';
import { deletePersona, getPersonas,getPersona, postPersona, updatePersona } from '../controllers/persona';

const router = Router();

router.get('/', getPersonas);
router.get('/:id', getPersona)
router.delete('/:id', deletePersona)
router.post('/', postPersona)
router.put('/:id', updatePersona)
export default router;