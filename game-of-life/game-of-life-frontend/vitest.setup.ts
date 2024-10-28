import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

axios.get = vi.fn();
axios.post = vi.fn();
